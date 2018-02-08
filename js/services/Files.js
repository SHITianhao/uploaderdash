import { FILE_CHUNK_SIZE } from '@Constants';
import SparkMD5 from 'spark-md5';

const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

export const getFileMD5 = (file) => {
    const spark = new SparkMD5();
    spark.append(file.lastModified);
    spark.append(file.name);
    spark.append(file.size);
    spark.append(file.type);
    spark.append(file.webkitRelativePath);
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
    let loadChunkIndex = 0;
    let allChunkLoaded = totalChunk == 0;
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
        const readNextChunk = () => {
            if(!allChunkLoaded) {
                loadedChunk = readChunk(fileReader, file, loadChunkIndex, FILE_CHUNK_SIZE);
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
                index: loadChunkIndex,
                md5
            }).then(() => {
                loadChunkIndex++;
                allChunkLoaded = loadChunkIndex >= totalChunk;
                readNextChunk();
            })
        }
    
        readNextChunk();
    })
}

export const getFileSize = (file) => {
    let bytes = file.size;
    const thresh = 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    const units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}