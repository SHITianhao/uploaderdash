import React, { Component } from 'react';

const splitPath = (path) => {
    if(path == '/') return [];
    const paths = path.split('/');
    paths.shift();
    return paths;
}

class FolderPath extends Component {
    render = () => (
        <div className={`flex-container`} style={{paddingRight: '16px'}}>
            <span>上传目录:</span>
            <div className="breadcrumb">
                <div className="crumb svg" >
                    <a><img className="svg" src="/core/img/places/home.svg" alt="Home" /></a>
                </div>
                {splitPath(this.props.path).map((p, index) => (
                    <div className="crumb svg" key={index}><a>{p}</a></div>
                ))}
            </div>
        </div>
    )
}

export default FolderPath