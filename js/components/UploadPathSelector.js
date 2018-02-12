import React, {Component} from 'react';
import FolderPath from '@Components/FolderPath'
import axios from 'axios';

class UploadPathSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            path: this.props.path || '/',
            folders: [],
            selectedFolder: -1
        }
    }

    componentDidMount = () => {
        this.fetchFolderList(this.state.path);
    }

    fetchFolderList = (path) => {
        axios.get(`${this.props.baseUrl}/subdirs?path=${path}`, {
            headers: {
                'requesttoken': oc_requesttoken
            }
        })
        .then(resp => {
            this.setState({
                folders: resp.data
            })
        })
    }

    enterFolder = (folder) => {
        const newPath = `${this.state.path == '/' ? '' : this.state.path}/${folder}`;
        this.setState({
            path: newPath,
            selectedFolder: -1
        })
        this.fetchFolderList(newPath);
    }

    backParentFolder = () => {
        let newPath = this.state.path;
        if(newPath != '/') {
            const list = newPath.split('/');
            list.pop();
            newPath = list.join('/')
        }
        this.setState({
            path: newPath,
            selectedFolder: -1
        })
        this.fetchFolderList(newPath);
    }

    selectFolder = (index) => {
        this.setState({
            selectedFolder: index
        })
    }

    onCancel = () => {
        this.props.onRequestClose()
    }

    onSeleted = () => {
        const selectedFolder = `${this.state.selectedFolder == -1 ? '' : this.state.folders[this.state.selectedFolder]}`
        const selectedPath = `${this.state.path == '/'? '': this.state.path}/${selectedFolder}`
        this.props.onSelected(selectedPath)
    }

    render = () => (
        <div className="modal-content">
            <div className="app-row flex-container modal-header">
                <span className='button' onClick={this.backParentFolder}>返回</span>
                <FolderPath path={this.state.path}/>
            </div>
            <div className="modal-body">
                {this.state.folders.length == 0? <div className="app-row flex-container">无子目录</div> : ''}
                {this.state.folders.map((folder, index) => (
                    <div className="app-row flex-container" 
                        key={index}
                        onClick={() => this.selectFolder(index)}
                        onDoubleClick={() => this.enterFolder(folder)}
                        style={this.state.selectedFolder == index ? {backgroundColor: "#BDBDBD"}: {}} >
                        <div style={{
                            backgroundImage:'url(/apps/theming/img/core/filetypes/folder.svg?v=0)',
                            backgroundSize: '32px',
                            width: '32px',
                            height: '32px'
                        }}>
                        </div>
                        <div style={{paddingLeft: '16px'}}>{folder}</div>
                    </div>
                ))}
            </div>
            <div className="app-row flex-container-end modal-footer">
                <button className="button" onClick={this.onCancel}>取消</button>
                <button className="button" onClick={this.onSeleted}>选择</button>
            </div>
        </div>
    )
}

export default UploadPathSelector;