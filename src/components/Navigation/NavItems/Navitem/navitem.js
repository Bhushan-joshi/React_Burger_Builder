import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './navitem.module.css';


const navitem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}
            activeClassName={classes.active}
            exact>
            {props.children}
        </NavLink>
    </li>
);

export default navitem;