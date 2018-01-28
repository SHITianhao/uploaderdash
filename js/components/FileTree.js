import React, { Component } from 'react';
import FileNode from '@Services/FileNode';

const getFileStatusIcon = (node) => {
  if(node instanceof FileNode) {
    return !node.inited?  <div className="icon icon-pause"></div> : <div className="icon icon-checkmark-color"></div>;
  } else {
    return '';
  }
}

const FileTreeNode = ({node}) => (
  <li>{node.name}{getFileStatusIcon(node)}</li>
)


const FolderTreeNode = ({node}) => (
  <li onClick={() => {console.log('on click'); node.collapsed = true;}}>
    <div>
      <div className={`${node.collapsed ? 'folder-close' : ''} icon icon-caret-dark`}></div>
      {node.name}
    </div>
    {node.collapsed? '' :
    <ul>
      <Node nodes={node.children} />
    </ul>}
  </li>
)

const Node = ({nodes}) => (
  Object.keys(nodes).map(key => {
    const node = nodes[key];
    return node.isLeaf() ? <FileTreeNode node={node}/>: <FolderTreeNode node={node}/>
  })
)

const FileTree = ({rootFolder}) => (
  rootFolder === undefined ? '' :
  <div>
    <div className='tree-root'>
      <div className="icon icon-caret-dark"></div>{rootFolder.name}
    </div>
    <ul className="tree">
      <Node nodes={rootFolder.children}/>
    </ul>
  </div>
)

export default FileTree;