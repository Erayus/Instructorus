import classes from './whiteBox.module.css';
import React from 'react';

const whiteBox = (props) => {
    return (
        <div className={classes.WhiteBox}>
            {props.children}
        </div>
    )
}

export default whiteBox;