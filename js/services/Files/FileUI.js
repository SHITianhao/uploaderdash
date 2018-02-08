import { Map, List } from 'immutable';
import { getFileMD5, getFileTotalChunk } from '@Services/Files';
import { INIT_FILE_LIST_MAX_LEN } from '@Constants';

/**
 * 
 * @param {File} file 
 */
export const createFile = (file) => {
    return Map({
        filename: file.name,
        type: 'file',
        file: file,
        md5: getFileMD5(file),
        totalChunk: getFileTotalChunk(file),
        fileId: null,
        uploadedChunks: 0,
        skipChunks: [],
        relativePath: file.webkitRelativePath,
        fileSize: file.size,
        inited: false,
        uploaded: false,
        merged: false,
    });
}

/**
 * 
 * @param {string} name: folder name 
 */
export const createFolder = (name) => {
    return Map({
        filename: name,
        type: 'dir',
        children: Map()
    });
}

/**
 * Caculate total chunk in the folder
 * 
 * @param {Map} folder 
 * @returns {Number} total chunk number
 */
export const calculateFolderTotalChunk = (folder) => {
    const children = folder.get('children').valueSeq();
    let totalChunk = 0;
    for(let i = 0; i < children.size; i++) {
        const child = children.get(i);
        if(child.get('type') == 'file') {
            totalChunk += child.get('totalChunk');
        } else {
            totalChunk += calculateFolderTotalChunk(child);
        }
    }
    return totalChunk;
}

/**
 * Caculate total file in the folder
 * 
 * @param {Map} folder 
 */
export const calculateFolderTotalFile = (folder) => {
    const children = folder.get('children').valueSeq();
    let totalFile = 0;
    for(let i = 0; i < children.size; i++) {
        const child = children.get(i);
        if(child.get('type') == 'file') {
            totalFile++;
        } else {
            totalFile += calculateFolderTotalFile(child);
        }
    }
    return totalFile;
}

const toImmutablePath = (path) => {
    let pathList = path.split('/');
    let nodeName = pathList.shift();
    let immutablePath = List();
    while(nodeName != undefined && nodeName != null) {
        immutablePath = immutablePath.push('children');
        immutablePath = immutablePath.push(nodeName);
        nodeName = pathList.shift();
    }
    return immutablePath;
}

/**
 * 
 * @param {Map} root 
 * @param {string} path path to file
 * @param {Map} file
 */
export const addFile = (root, path, file) => {
    path = path == '' ? file.get('filename') : path;
    const setPath = toImmutablePath(path);
    let folderPath = setPath.pop().pop();
    let existFolder = root.getIn(folderPath.toArray());
    let newFolder = null;
    while(existFolder == null) {
        if(newFolder == null) {
            newFolder = createFolder(folderPath.last());
        } else {
            newFolder = createFolder(folderPath.last()).setIn(['children', newFolder.get('filename')], newFolder);
        }
        folderPath = folderPath.pop().pop();
        existFolder = root.getIn(folderPath.toArray());
    }
    if(newFolder != null) {
        folderPath = folderPath.push('children').push(newFolder.get('filename'));
        root = root.setIn(folderPath.toArray(), newFolder);
    }
    
    root = root.setIn(setPath.toArray(), file);
    return root;
}

/**
 * 
 * @param {Map} root 
 * @param {string} path: path to delete file
 */
export const deleteFile = (root, path) => {
    const setPath = toImmutablePath(path);
    return root.deleteIn(setPath.toArray());
}

/**
 * 
 * @param {Map} root 
 * @param {string} path path to delete file
 * @returns {Map} file node
 */
export const getFile = (root, path) => {
    const getPath = toImmutablePath(path);
    return root.getIn(getPath.toArray());
}

/**
 * 
 * @param {Map} root 
 * @param {string} path 
 * @param {object} value 
 */
export const updateFile = (root, path, value) => {
    const filePath = toImmutablePath(path);
    let file = root.getIn(filePath.toArray());
    Object.keys(value).map(key => {
        file = file.set(key, value[key]);
    })
    return root.setIn(filePath.toArray(), file);
}

/**
 * Create folder structure by list of files
 * 
 * @param {[File]} files 
 */
export const createFolderStructure = (files) => {
    return new Promise((resolve, reject) => {
        let root = createFolder('root');
        for (var i = 0; i < files.length; i++) {
            const file = files[i];
            const path = file.webkitRelativePath;
            root = addFile(root, path, createFile(file))
        }
        resolve(root);
    })
}

/**
 * @param {Array<File>} root 
 * @param {Map} root 
 * @returns {Array<Array>} list of file info
 */
export const getUploadFileInfo = (files, root) => {
    const result = [];
    let offset = 0;
    while(offset < files.length) {
        const list = [];
        for (let i = offset; i < offset + INIT_FILE_LIST_MAX_LEN && i < files.length; i++) {
            const file = files[i];
            const path = file.webkitRelativePath == ''? file.name : file.webkitRelativePath;
            const info = getFile(root, path).delete('file').delete('status').delete('skipChunks').delete('fileId').toJS();
            list.push(info);
        }
        result.push(list);
        offset += INIT_FILE_LIST_MAX_LEN;
    }
    return result;
}