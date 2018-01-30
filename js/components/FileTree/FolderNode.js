import React, { Component } from 'react';
import { getFolderIcon } from '@Icons';

import Node from './Node';

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
        <li>
            <div onClick={this.onFolderClick} className='node-desc'>
                <div className="tree-file-icon file-icon icon">{getFolderIcon(this.state.collapsed)}</div>
                <div className='tree-file-name'>{this.props.node.name}</div>
                <div className='tree-file-status'>{this.props.node.getChildrenNum()}</div>
            </div>
            {this.state.collapsed? '' :
                <ul>
                    <Node nodes={this.props.node.children} level={this.props.level+1}/>
                </ul>
            }
        </li>
    )
}

export default FolderNode;