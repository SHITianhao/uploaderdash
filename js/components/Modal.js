import React, { Component } from 'react';

class Modal extends Component {

    constructor(props) {
        super(props);
    }

    render = () => (
        <div>
            <div className="modal" style={{display: `${this.props.show?'block': 'none'}`}}>
                {this.props.children}
            </div>
        </div>
    )

}

export default Modal;