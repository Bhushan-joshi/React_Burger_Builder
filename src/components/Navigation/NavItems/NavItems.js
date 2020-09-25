import React from 'react';
import classes from './NavItems.module.css';

import Navitem from './Navitem/navitem';

const navitems = (props) => (
    <ul className={classes.NavigationItems}>
        <Navitem link='/' > Burger Builder</Navitem>
        <Navitem link='/orders' > Orders</Navitem>

    </ul>
);


export default navitems;