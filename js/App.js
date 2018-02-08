import React, {Component} from 'react';
import UploadButton from '@Components/UploadButton';
import FileTree from '@Components/FileTree/Tree';
import Loading from '@Components/Loading';
import FolderPath from '@Components/FolderPath'
import Modal from '@Components/Modal'
import UploadPathSelector from '@Components/UploadPathSelector'

import { memorySizeOf } from '@Services/Util'
import { createFolderStructure, createFolder, getUploadFileInfo, updateFile, getFile, calculateFolderTotalChunk } from '@Services/Files/FileUI'
import { sendFileInitRequest, sendFolderChunks } from '@Services/API';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dumpRoot: createFolder('root'),
            loading: false,
            loadingText: '加载中',
            files: [],
            totalChunks: 0,
            uploadedChunks: 0,
            uploadingRootPath: '/',
            showModal: false
        }
        this.baseUrl = OC.generateUrl('/apps/uploaderdash');
    }

    sendUploadFileRequest = () => {
        const infoList = getUploadFileInfo(this.state.files, this.state.dumpRoot);
        console.log(infoList);
        console.log(memorySizeOf(infoList));
        const url = `${this.baseUrl}/files`;
        sendFileInitRequest(url, this.state.uploadingRootPath, infoList, ({data, next}) => {
            let root = this.state.dumpRoot;
            for (let i = 0; i < data.length; i++) {
                const file = data[i];
                let updateValue = {
                    fileId: file.id,
                    inited: true,
                    skipChunks: file.uploadedChunks == null ? [] :  file.uploadedChunks
                }
                if(file.completed) {
                    updateValue = Object.assign(updateValue, {
                        uploaded: true,
                        merged: true
                    })
                }
                if(file.uploadedChunks != null && file.uploadedChunks != undefined) {
                    const skipChunks = file.uploadedChunks.map(chunk => {
                        return chunk.chunkMd5;
                    })
                    updateValue = Object.assign(updateValue, { skipChunks })
                }
                root = updateFile(root, file.relativePath, updateValue);
            }
            this.setState({
                dumpRoot: root
            })
            return next();
        }).then(() => {
            return sendFolderChunks(this.baseUrl, this.state.dumpRoot, 
            // chunk uploaded callback
            ({data, node, skiped, finished, chunkIndex}) => {
                console.log('do next chunk');
                let newRoot = this.state.dumpRoot;
                console.log('chunkIndex='+chunkIndex)
                const relativePath = node.get('relativePath');
                const path = relativePath == '' ? node.get('filename') : relativePath;
                newRoot = updateFile(newRoot, path, {
                    uploadedChunks: chunkIndex,
                    uploaded: finished
                });
                this.setState({
                    dumpRoot: newRoot,
                    uploadedChunks: this.state.uploadedChunks+1
                })
            },
            // file merged callback
            ({data, node, next, isFile, skiped}) => {
                if(isFile == true) {
                    let newRoot = this.state.dumpRoot;
                    const relativePath = node.get('relativePath');
                    const updatePath = relativePath == '' ? node.get('filename') : relativePath;
                    newRoot = updateFile(newRoot, updatePath, {
                        uploaded: true,
                        merged: true
                    });
                    let uploadedChunks = this.state.uploadedChunks;
                    if(skiped) {
                        uploadedChunks += node.get('totalChunk')
                    }
                    this.setState({
                        dumpRoot: newRoot,
                        uploadedChunks
                    })
                }
                return next();
            })
        })
    }

    onFiles = (files) => {
        console.log(files.length);
        const dumpRoot = createFolderStructure(files);
        const totalChunks = calculateFolderTotalChunk(dumpRoot);
        this.setState({
            loadingText: '加载中',
            loading: false,
            totalChunks,
            dumpRoot,
            files
        })
    }

    onSubmitClick = () => {
        this.sendUploadFileRequest();
    }

    onUploadBtnClick = () => {
        this.setState({
            loading: true
        })
    }

    onUploadPathChange = (newPath) => {
        this.setState({
            uploadingRootPath: newPath,
            showModal: false
        })
    }

    onUploadPathModalClose = () => {
        this.setState({
            showModal: false
        })
    }

    openUploadPathSelector = () => {
        this.setState({
            showModal: true
        })
    }

    getUploadingPercentage = (current, total) => {
        if(total == 0) {
            return 0
        } else {
            return Math.ceil(current/total * 100).toFixed(2);
        }
    }

    render = () => (
        <div className="app-content">
            <div className="app-row flex-container">
                <UploadButton onFiles={this.onFiles} onClick={this.onUploadBtnClick}/>
                <button className="button" onClick={this.onSubmitClick} disabled={this.state.files == 0}>
                    发送请求
                </button>
                <span>上传进度: </span>
                <div className='app-progress'>
                    <div className='progress-text'>{this.getUploadingPercentage(this.state.uploadedChunks, this.state.totalChunks)}%</div>
                    <progress value={this.getUploadingPercentage(this.state.uploadedChunks, this.state.totalChunks)} max="100"></progress>
                </div>
            </div>
            <div className="app-row flex-container">
                <FolderPath path={this.state.uploadingRootPath}/>
                <button className='button' onClick={this.openUploadPathSelector}><span className='icon icon-rename' />编辑</button>
            </div>
            <div className="app-row flex-container">
                <FileTree root={this.state.dumpRoot} />
            </div>
            <Modal show={this.state.showModal}>
                <UploadPathSelector 
                    baseUrl={this.baseUrl} 
                    path={this.state.uploadingRootPath} 
                    onSelected={this.onUploadPathChange}
                    onRequestClose={this.onUploadPathModalClose}/>
            </Modal>
            <Loading text={this.state.loadingText} show={this.state.loading} />
        </div>
    )
}

export default App;