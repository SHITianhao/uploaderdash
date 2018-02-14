import React, {Component} from 'react';

const Loading = ({show, text, requestCancel, cancelable}) => (
    <div className="loading-mask" hidden={!show}>
        <div className="center-loading">
            <div className="loading icon icon-loading"></div>
            <div className="center-loading-text">{text}</div>
            <div className="center-loading-text" style={!cancelable?{display:'none'}:{}}>
                <button className="button" onClick={requestCancel}>取消</button>
            </div>
        </div>
    </div>
)

export default Loading;