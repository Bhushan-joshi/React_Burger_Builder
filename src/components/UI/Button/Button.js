import React from 'react';

import classes from './Button.module.css';

const btn = (props)=>(
    <button
    disabled={props.disabled}
    className={[classes.Button , classes[props.btnType]].join(' ')}
    onClick={props.click}
    >
        {props.children}
    </button>
)


export default btn;