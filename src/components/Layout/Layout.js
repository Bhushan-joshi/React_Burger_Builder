import React from 'react';
import Aux from '../../HOC/auxi';

import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
    <div>toolbar sidebar backdrop</div>
    <main className={classes.content}>
        {props.children}
    </main>
    </Aux>
)

export default layout;