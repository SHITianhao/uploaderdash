import IFileNode from './IFileNode';
import axios from 'axios';
import { getFileMD5, getFileTotalChunk, readChunks } from './Files'

class FileNode extends IFileNode {
    constructor(file) {
        super(file.name);
        this.file = file;
        this.fileId = null;
        this.uploadedChunks = 0;
    }

    sendFileInitRequest = (url) => {
        return axios.post(url, {files: [this.fileInfo]}).then(resp => {
            const data = resp.data[0];
            const { id } = data;
            this.fileId = id;
            this.inited = true;
            // all sub files inited
            if(typeof this._onUpdate === 'function') this._onUpdate(this);
            return this;
        })
    }

    sendChunks = (baseUrl) => {
        const fileMD5 = getFileMD5(this.file);
        const chunkUrl = baseUrl + '/chunks';
        const mergeUrl = baseUrl + '/merge';
        return readChunks(this.file, ({ data, index, md5 }, allChunkLoaded) => {
            const form = new FormData();
            form.append('data', data);
            form.append('fileId', this.fileId);
            form.append('fileMD5', fileMD5);
            form.append('chunkIndex', index);
            form.append('chunkMD5', md5);
            axios.post(`${chunkUrl}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(resp => {
                this.uploadedChunks++;
                if(typeof this._onUpdate === 'function') this._onUpdate(this);
                console.log(resp.data);
            })
        }).then(() => {
            console.log(this.name +' chunks uploading done')
            this.uploaded = true;
            if(typeof this._onUpdate === 'function') this._onUpdate(this);
            const mergeData = {
                fileId: this.fileId
            }
            return axios.post(`${mergeUrl}`, mergeData);
        }).then(resp => {
            console.log(resp.data);
            this.merged = true;
            if(typeof this._onUpdate === 'function') this._onUpdate(this);
        })
    }

    get fileInfo() {
        return {
            "filename": this.file.name,
            "md5": getFileMD5(this.file),
            "totalChunk": getFileTotalChunk(this.file),
            "relativePath": this.file.webkitRelativePath,
            "fileSize": this.file.size
        }
    }

    get totalChunk() {
        return  getFileTotalChunk(this.file);
    }

    get uploadingPercentage() {
        return (this.uploadedChunks / this.totalChunk * 100).toFixed(1)
    }
}

export default FileNode;