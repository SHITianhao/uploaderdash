import axios from 'axios';
import { Map, List } from 'immutable';
import { readChunks } from '@Services/Files';
/**
 * Send init file request
 * 
 * @param {string} url 
 * @param {string} rootPath
 * @param {Array<Array<File>>} list 
 * @param {Function} handler
 * @return {Promise}
 */
export const sendFileInitRequest = (url, rootPath, list, handler) => {
    let index = 0;
    const next = () => {
        if(index < list.length) {
            return axios.post(url, {files: list[index], rootPath})
            .then(resp => {
                index++;
                return {data: resp.data, next};
            })
            .then(handler);
        } else {
            return Promise.resolve();
        }
    }
    return next();
}

/**
 * 
 * @param {string} url basic url
 * @param {Map} node file node
 * @param {Function} chunkHandler callback when chunk uploaded
 * @return {Promise}
 */
const sendFileChunks = (url, node, chunkHandler) => {
    if(node.get('merged')) {
        return Promise.resolve({merged: true});
    }
    return readChunks(node.get('file'), ({ data, index, md5 }, allChunkLoaded) => {
        let promise;
        if(node.get('skipChunks').includes(md5)) {
            console.log('uploaded chunk')
            promise = Promise.resolve({skiped: true, node, finished: allChunkLoaded, chunkIndex: index});
        } else {
            const form = new FormData();
            form.append('data', data);
            form.append('fileId', node.get('fileId'));
            form.append('fileMD5', node.get('md5'));
            form.append('chunkIndex', index);
            form.append('chunkMD5', md5);
            promise = axios.post(`${url}/chunks`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(resp => {
                return {data: resp.data, node, skiped: false, finished: allChunkLoaded, chunkIndex: index};
            })
        }
        return promise.then(chunkHandler)
    }).then(() => {
        return {merged: false}
    })
}

/**
 * 
 * @param {string} baseUrl 
 * @param {Map} folder 
 * @param {Function} chunkHandler handle when chunk uploaded
 * @param {Function} fileHandler handle when file merged
 */
export const sendFolderChunks = (baseUrl, folder, chunkHandler, fileHandler) => {
    const nodes = folder.get('children').valueSeq();
    let index = 0;

    const next = () => {
        if(index < nodes.size) {
            const node = nodes.get(index);
            index++;
            if(node.get('type') == 'file') {
                return nextFile(node);
            } else {
                return nextFolder(node);
            }
        } else {
            return Promise.resolve();
        }
    }

    /**
     * Send next file chunks
     * @return {Promise}
     */
    const nextFile = (file) => {
        return sendFileChunks(baseUrl, file, chunkHandler)
        .then(({merged}) => {
            if(!merged) {
                return axios.post(`${baseUrl}/merge`, {fileId: file.get('fileId')})
                .then(resp => ({data: resp.data, skiped: false}))
            } else {
                return Promise.resolve({data: null, skiped: true}); 
            }
        })
        .then(({data, skiped}) => {
            return {data, node: file, next, isFile: true, skiped}
        })
        .then(fileHandler);
    }
    /**
     * Send next folder chunks
     * @return {Promise}
     */
    const nextFolder = (folder) => {
        return sendFolderChunks(baseUrl, folder, chunkHandler, fileHandler)
        .then(() => {
            return {data: null, node: folder, next,  isFile: false}
        })
        .then(fileHandler);
    }

    return Promise.all([next(), next(), next()])
}