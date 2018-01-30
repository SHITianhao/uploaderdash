import React, { Component } from 'react';
import { getFileIcon, MergeIcon } from '@Icons';
import { getFileSize } from '@Services/Files';

const FileStatusIcon = ({node}) => {
    const merging = node.inited && node.uploaded && !node.merged;
    const finish = node.inited && node.uploaded && node.merged;
    return (
        <div className={`tree-file-status-icon ${finish?'icon-checkmark-color':''}`}>
            {merging?<div style={{height: '100%', width: '16px'}}><MergeIcon /></div>: ''}
        </div>
    )
}

const FileIcon = ({node}) => {
    const Icon = getFileIcon(node.file);
    return (
        <div className='tree-file-icon file-icon icon'>
            <Icon />
        </div>
    )
}

const FileSize = ({node}) => (
    <div className='tree-file-size'>{getFileSize(node.file)}</div>
)

const showProcess = (node) => {
    return node.inited && !node.uploaded && !node.merged;
}
const FileNode = ({node}) => (
    <li className='node-desc'>
        <FileIcon node={node}/>
        <div className='tree-file-name'>
            {node.name}
        </div>
        <div className='tree-file-status'>
            <FileSize node={node}/>
            <FileStatusIcon node={node}/>
            <div className='app-progress' hidden={!showProcess(node)}>
                <div className='progress-text' hidden={!showProcess(node)}>{node.uploadingPercentage}%</div>
                <progress hidden={!showProcess(node)} value={node.uploadingPercentage} max="100"></progress>
            </div>
        </div>
    </li>
)

export default FileNode;