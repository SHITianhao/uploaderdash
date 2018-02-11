import React, { Component } from 'react';
import { getFolderIcon } from '@Icons';

import Node from './Node';

import { calculateFolderTotalFile } from '@Services/Files/FileUI';

class FolderNode extends Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        }
    }

    onFolderClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }


    render = () => (
        <li className={`${this.props.level == 0 ? 'no-left-padding': ''}`}>
            <div onClick={this.onFolderClick} className='node-desc'>
                <div className="tree-file-icon file-icon icon">{getFolderIcon(this.state.collapsed)}</div>
                <div className='tree-file-name'>{this.props.node.get('filename')}</div>
                <div className='tree-file-status'>{calculateFolderTotalFile(this.props.node)} 个文件</div>
            </div>
            {this.state.collapsed? '' :
                <ul>
                    <Node nodes={this.props.node.get('children')} level={this.props.level+1}/>
                </ul>
            }
        </li>
    )
}

export default FolderNode;