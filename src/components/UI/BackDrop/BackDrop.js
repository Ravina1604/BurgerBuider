import React from 'react';
import classes from './BackDrop.css';

const backDrop = (props) => {
    return <div className={classes.BackDrop} onClick={props.clicked}></div>;
}

export default backDrop;