import React, { Component, Fragment } from 'react';
import BackDrop from '../BackDrop/BackDrop';
import classes from './Modal.css';

class Modal extends Component {

    //no need to do as this component is only mounting  when show props is true
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.children !== this.props.children;
    }

    render() {
        return <Fragment>
            <BackDrop clicked={this.props.modalClosed} />
            <div
                className={classes.Modal}
                style={{ transform: 'transletY(0)', opacity: '1' }} >{this.props.children}
            </div>
        </Fragment>;
    }
}
export default Modal;
