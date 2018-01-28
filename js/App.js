import React, {Component} from 'react';
import axios from 'axios';
import UploadButton from '@Components/UploadButton';
import FileTree from '@Components/FileTree';

import { convertToTrees, getFileMD5, getFileTotalChunk } from '@Services/Files'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trees: []
        }
    }

    sendChunks = () => {
        this.state.trees.map((root, index) => {
            root.setOnUpdate(newRoot => {
                const oldTress = this.state.trees;
                oldTress[index] = newRoot;
                this.setState({
                    trees: oldTress
                })
            })
            .sendChunks(OC.generateUrl('/apps/uploaderdash/chunks'))
            .then(() => {
                console.log('done')
            })
            .catch(err => {
                console.error(err)
            })
        })
    }

    sendUploadFileRequest = () => {
        this.state.trees.map((root, index) => {
            console.log(root);
            root.setOnUpdate(newRoot => {
                const oldTress = this.state.trees;
                oldTress[index] = newRoot;
                this.setState({
                    trees: oldTress
                })
            })
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
        console.log(files);
        console.log(files.length)
        const trees = convertToTrees(files);
        console.log(trees);
        this.setState({
            trees
        })
    }

    onSubmitClick = () => {
        this.sendUploadFileRequest();
    }

    render = () => (
        <div className="app-content">
            <div className="app-row">
                <UploadButton onFiles={this.onFiles}/>
                <a className="button" onClick={this.onSubmitClick} >
                    发送请求
                </a>
            </div>
            <div className="app-row flex-container">
                {this.state.trees.map(tree => (
                    <FileTree rootFolder={tree}/>
                ))}
            </div>
        </div>
    )
}

export default App;