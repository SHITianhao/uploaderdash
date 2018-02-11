import React, {Component} from 'react';

const Loading = ({show, text}) => (
    <div className="loading-mask" hidden={!show}>
        <div className="center-loading">
            <div className="loading icon icon-loading"></div>
            <div className="center-loading-text">{text}</div>
        </div>
    </div>
)

export default Loading;