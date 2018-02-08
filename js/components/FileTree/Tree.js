import React, { Component } from 'react';
import Node from './Node';

const Tree = ({root}) => {
  return(
    <ul className="tree">
      <Node nodes={root.get('children')} level={0}/>
    </ul>
  )
}

export default Tree;