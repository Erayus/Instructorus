import classes from './whiteBox.module.css';
import React from 'react';

const whiteBox = (props) => {
    return (
        <div className={[classes.WhiteBox, "z-depth-2"].join(" ")} style={{maxWidth: props.maxWidth}}>
            {props.children}
        </div>
    )
}

export default whiteBox;