import React from 'react';
import Logo from '../../Logo/Logo'
import Navitems from '../NavItems/NavItems';
import DrawerToggler from '../Sidedrower/DrawerToggler/DrawerToggle'

import classes from './Toolbar.module.css';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggler clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <Navitems isAuth={props.isAuth}/>
        </nav>

    </header>
)

export default toolbar