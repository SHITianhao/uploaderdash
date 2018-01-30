import React, { Component } from 'react';
import FileNode from '@Services/FileNode';
import Node from './Node';

const Tree = ({root}) => {
  return(
    <ul className="tree">
      <Node nodes={root.children} level={0}/>
    </ul>
  )
}

export default Tree;