import IFileNode from './IFileNode';
import FileNode from './FileNode';
import axios from 'axios';



class FolderNode extends IFileNode {
    constructor(name) {
        super(name);
    }

    childUpdate = (newChild) => {
        this.addChild(newChild.name, newChild);
        if(typeof this._onUpdate === 'function') this._onUpdate(this);
    }

    sendFileInitRequest = (url) => {
        const filenames = Object.keys(this.children);
        const filesInfo = filenames.filter(this.filterFileNode)
        .map(filename => {
            const child = this.children[filename];
            return child.fileInfo
        });

        return axios.post(url, {files: filesInfo}).then(resp => {
            const data = resp.data;
            data.map(initFile => {
                const {filename, id } = initFile;
                const newChilNode = Object.assign(this.children[filename], {inited: true, fileId: id});
                this.children[filename] = newChilNode;
            })
            // all sub files inited
            if(typeof this._onUpdate === 'function') this._onUpdate(this);
        })
        .then(() => {
            const subFolders = filenames.filter(this.filterFolderNode)
            .map(folderName => {
                return this.children[folderName].setOnUpdate(value => {
                    if(typeof this._onUpdate === 'function') this._onUpdate(this);
                });
            });
            
            const subFolderInitPromises = subFolders.reduce((list, folder) => {
                    const promise = folder.sendFileInitRequest(url);
                    return list.concat([promise]);
            }, []);

            return Promise.all(subFolderInitPromises)
            .then(() => {
                this.inited = true;
                if(typeof this._onUpdate === 'function') this._onUpdate(this);
                return this;
            });
           
        })
    }

    sendChunks = (baseUrl) => {
        
        const filenames = Object.keys(this.children);
        const promises = filenames.filter(this.filterFileNode)
        .map(filename => {
            return this.children[filename];
        }).reduce((list, file) => {
            const promise = file.setOnUpdate(this.childUpdate).sendChunks(baseUrl);
            return list.concat([promise]);
        }, [])

        return Promise.all(promises);
    }
}

export default FolderNode;