import IFileNode from './IFileNode';
import axios from 'axios';
import { getFileMD5, getFileTotalChunk, readChunks } from './Files'

class FileNode extends IFileNode {
    constructor(file) {
        super(file.name);
        this.file = file;
        this.fileId = null;
    }

    sendChunks = (url) => {
        return readChunks(this.file, ({ data, index, md5 }, allChunkLoaded) => {
            const form = new FormData();
            form.append('data', data);
            form.append('fileId', this.fileId);
            form.append('chunkIndex', index);
            form.append('md5', md5);
            axios.post(`${url}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(resp => {
                console.log(resp.data);
            })
        }).then(() => {
            console.log(this.name +' uploading done')
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

    // sendFileInitRequest = (url) => {
    //     return axios.post(url, data).then(resp => {
    //         this.inited = true;
    //         this.fileId = resp.data.id;
    //         return this;
    //     })
    // }
}

export default FileNode;