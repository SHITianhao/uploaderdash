import React, {Component} from 'react';
import UploadButton from '@Components/UploadButton';
import FileTree from '@Components/FileTree/Tree';
import Loading from '@Components/Loading';

import TreeNode from '@Services/TreeNode';

import { convertToTrees, getFileMD5, getFileTotalChunk } from '@Services/Files'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dumpRoot: new TreeNode('root'),
            loading: false
        }
    }

    updateTree = (newNode) => {
        const dumpRoot = this.state.dumpRoot;
        dumpRoot.addChild(newNode.name, newNode);
        this.setState({
            dumpRoot
        })
    }

    sendChunks = () => {
        Object.keys(this.state.dumpRoot.children).map(key => {
            const root = this.state.dumpRoot.getChild(key);
            root.setOnUpdate(this.updateTree)
            .sendChunks(OC.generateUrl('/apps/uploaderdash'))
            .then(() => {
                console.log('done')
            })
            .catch(err => {
                console.error(err)
            })
        })
    }

    sendUploadFileRequest = () => {
        Object.keys(this.state.dumpRoot.children).map(key => {
            const root = this.state.dumpRoot.getChild(key);
            root.setOnUpdate(this.updateTree)
            .sendFileInitRequest(OC.generateUrl('/apps/uploaderdash/files'))
            .then(() => {
                console.log('done')
                this.sendChunks();
            })
            .catch(err => {
                console.error(err)
            })
        })
    }

    onFiles = (files) => {
        this.setState({
            loading: false
        })
        // console.log(files);
        console.log(files.length)
        const dumpRoot = convertToTrees(files);
        console.log(dumpRoot);
        this.setState({
            dumpRoot
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

    render = () => (
        <div className="app-content">
            <div className="app-row">
                <UploadButton onFiles={this.onFiles} onClick={this.onUploadBtnClick}/>
                <a className="button" onClick={this.onSubmitClick} >
                    发送请求
                </a>
            </div>
            <div className="app-row flex-container">
                <FileTree root={this.state.dumpRoot} />
            </div>
            <Loading text={'加载中'} show={this.state.loading} />
        </div>
    )
}

export default App;