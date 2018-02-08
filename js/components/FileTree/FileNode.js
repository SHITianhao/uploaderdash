import React, { Component } from 'react';
import { getFileIcon, MergeIcon } from '@Icons';
import { getFileSize } from '@Services/Files';

const FileStatusIcon = ({node}) => {
    const merging = node.get('inited') && node.get('uploaded') && !node.get('merged'); 
    const finish = node.get('inited') && node.get('uploaded') && node.get('merged'); 
    return (
        <div className={`tree-file-status-icon ${finish?'icon-checkmark-color':''}`}>
            {merging?<div style={{height: '100%', width: '16px'}}><MergeIcon /></div>: ''}
        </div>
    )
}

const FileIcon = ({node}) => {
    const Icon = getFileIcon(node.get('file'));
    return (
        <div className='tree-file-icon file-icon icon'>
            <Icon />
        </div>
    )
}

const FileSize = ({node}) => (
    <div className='tree-file-size'>{getFileSize(node.get('file'))}</div>
)

const showProcess = (node) => {
    return node.get('inited') && !node.get('uploaded') && !node.get('merged'); 
}

const getUploadedPercentage = (node) => {
    return Math.ceil(node.get('uploadedChunks')/node.get('totalChunk') * 100).toFixed(1); 
}

const FileNode = ({node}) => (
    <li className='node-desc'>
        <FileIcon node={node}/>
        <div className='tree-file-name'>
            {node.get('filename')}
        </div>
        <div className='tree-file-status'>
            <FileSize node={node}/>
            <FileStatusIcon node={node}/>
            <div className='app-progress' hidden={!showProcess(node)}>
                <div className='progress-text' hidden={!showProcess(node)}>{getUploadedPercentage(node)}%</div>
                <progress hidden={!showProcess(node)} value={getUploadedPercentage(node)} max="100"></progress>
            </div>
        </div>
    </li>
)

export default FileNode;