import React, { Component } from 'react';
import { getFileIcon, Icon } from '@Icons';
import { getFileSize } from '@Services/Files';

const FileStatusIcon = ({node}) => {
    const merging = node.get('inited') && node.get('uploaded') && !node.get('merged'); 
    const finish = node.get('inited') && node.get('uploaded') && node.get('merged'); 
    return (
        <div className={`tree-file-status-icon ${finish?'icon-checkmark-color':''}`}>
            {merging?<div style={{height: '100%', width: '16px'}}><Icon name={'merge'} /></div>: ''}
        </div>
    )
}

const FileIcon = ({node}) => {
    return (
        <div className='tree-file-icon file-icon icon'>
            <Icon name={getFileIcon(node.get('file'))}/>
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
            <div className={`app-progress ${showProcess(node)? '' : 'hidden'}`}>
                <div className='progress-text'>{getUploadedPercentage(node)}%</div>
                <progress value={getUploadedPercentage(node)} max="100"></progress>
            </div>
        </div>
    </li>
)

export default FileNode;