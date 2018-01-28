import { FILE_CHUNK_SIZE } from '@Constants';
import SparkMD5 from 'spark-md5';
import TreeNode from './TreeNode';
import FileNode from './FileNode';
import FolderNode from './FolderNode';

const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

export const getFileMD5 = (file) => {
    const spark = new SparkMD5();
    spark.append(file.lastModified);
    spark.append(file.name);
    spark.append(file.size);
    spark.append(file.type);
    return spark.end();
}

export const getFileTotalChunk = (file) => {
    return Math.ceil(file.size / FILE_CHUNK_SIZE);
}

const readChunk = (fileReader, file, chunkIndex, chunkSize) => {
    const fileSize = file.size;
    const start = chunkIndex * chunkSize;
    const end = start + chunkSize > fileSize ? fileSize : start + chunkSize;
    const chunk = blobSlice.call(file, start, end);
    fileReader.readAsArrayBuffer(chunk);
    return chunk;
}

export const readChunks = (file, onChunkLoaded) => {
    const totalChunk = getFileTotalChunk(file);
    
    let loadedChunk = null;
    let loadedChunkIndex = 0;
    let allChunkLoaded = totalChunk == 0;
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
        const readNextChunk = () => {
            if(!allChunkLoaded) {
                loadedChunk = readChunk(fileReader, file, loadedChunkIndex++, FILE_CHUNK_SIZE);
                allChunkLoaded = loadedChunkIndex >= totalChunk;
            } else {
                resolve()
            }
        }
        fileReader.onload = (event) => {
            // calculat chunk MD5
            const buffer = event.target.result;
            const spark = new SparkMD5.ArrayBuffer();
            spark.append(buffer);
            const md5 = spark.end();
    
            onChunkLoaded({
                data: loadedChunk,
                index: loadedChunkIndex,
                md5
            })
    
            readNextChunk();
        }
    
        readNextChunk();
    })
}


export const convertToTrees = (files) => {
    const dump = new TreeNode('root');

    for (var i = 0; i < files.length; i++) {
        const file = files[i];
        const path = file.webkitRelativePath;
        let pathList = path.split('/');
        let parentNode = dump;
        let node = pathList.shift();
        let level = 1;
        while(node != undefined) {
            const nextNode = pathList.shift();
            if(nextNode == undefined) {
                const fileNode = new FileNode(file);
                parentNode.addChild(node, fileNode);
            } else {
                if(parentNode.hasChild(node)) {
                    parentNode = parentNode.getChild(node);
                } else {
                    // only open first level folder as default
                    const folderNode = new FolderNode(node, level>1);
                    parentNode.addChild(node, folderNode);
                    parentNode = folderNode;
                }
            }
            node = nextNode;
            level++;
        }
    }

    return  Object.keys(dump.children).map(key => {
        return dump.children[key];
    });
}