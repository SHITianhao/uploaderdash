import React, { Component } from 'react';
import { getFileMD5 } from '@Services/Files';

class UploadButton extends Component {

    constructor(props) {
        super(props);
        this.fileUploader = null;
        this.folderUploader = null;
        this.state = {
            uploadFolder: false,
            menuOpen: false
        }
    }

    componentDidMount() {
        // folder uploader
        this.folderUploader.directory = true;
        this.folderUploader.webkitdirectory = true;
        this.folderUploader.mozdirectory = true;
        this.folderUploader.nwdirectory = true;
        this.folderUploader.multiple = true;
        // multiple files
        this.fileUploader.multiple = true;
    }

    uploadFolderOnClick = (event) => {
        this.setState({
            uploadFolder: true,
            menuOpen: false
        }, () => {
            this.folderUploader.click();
        });
        this.props.onClick(event);
    }

    
    uploadFileOnClick = (event) => {
        this.setState({
            uploadFolder: false,
            menuOpen: false
        }, () => {
            this.fileUploader.click();
        });
        this.props.onClick(event);
    }

    handleFile = (event) => {
        console.log(event)
        this.setState({ menuOpen: false })
        const loader = this.state.uploadFolder? this.folderUploader: this.fileUploader;
        const files = Array.from(loader.files);
        this.props.onFiles(files);
    }

    openMenu = () => {
        this.setState({ menuOpen: true })
    }

    render = () => (
        <div style={{display: 'inline-block'}}>
            <input 
                ref={(input) => {this.fileUploader = input;}} 
                type="file" 
                onChange={this.handleFile} 
                style={{display: 'none'}} />
            <input 
                ref={(input) => {this.folderUploader = input;}} 
                type="file" 
                onChange={this.handleFile} 
                style={{display: 'none'}} />
            <a className="button" onClick={this.openMenu}>
                <span className="icon-upload"></span> 选择上传
                <div className={`popovermenu menu menu-left ${this.state.menuOpen?'open':''}`}>
                    <ul>
                        <li>
                            <button className="menuitem" onClick={this.uploadFileOnClick}>
                                <span className="icon icon-file"></span>
                                <span>添加文件</span>
                            </button>
                        </li>
                        <li>
                            <button className="menuitem" onClick={this.uploadFolderOnClick}>
                                <span className="icon icon-folder"></span>
                                <span>添加文件夹</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </a>
        </div>
    )
}

export default UploadButton;