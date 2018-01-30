import React, { Component } from 'react';

import FileNode from './FileNode';
import FolderNode from './FolderNode';

const Node = ({nodes, level}) => (
    Object.keys(nodes).map((key, index) => {
      const node = nodes[key];
      return node.isLeaf() ? <FileNode node={node} key={`${level}-${index}`}/>: <FolderNode node={node} level={level} key={`${level}-${index}`}/>
    })
)

export default Node;