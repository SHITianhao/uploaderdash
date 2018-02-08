import React, { Component } from 'react';

import FileNode from './FileNode';
import FolderNode from './FolderNode';

const Node = ({nodes, level}) => (
  nodes.valueSeq().map((node, key) => {
    return node.get('type') === 'file' ? <FileNode node={node} key={`${level}-${key}`}/>: <FolderNode node={node} level={level} key={`${level}-${key}`}/>
  }).toArray()
)

export default Node;