import React from 'react';
import classes from './NavItems.module.css';

import Navitem from './Navitem/navitem';

const navitems = (props) => {
    let auth = <Navitem link='/Signup'>Sign-up</Navitem>
    if (props.isAuth) {
        auth = (<React.Fragment>
            <Navitem link='/orders' > Orders</Navitem>
            <Navitem link='/logout' > LOGOUT</Navitem>
        </React.Fragment>)
    }
    return (
        <ul className={classes.NavigationItems}>
            <Navitem link='/' > Burger Builder</Navitem>
            {auth}
        </ul>
    )
};


export default navitems;