import React from 'react';
import Logo from '../../Logo/Logo'
import Navitems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxi/auxi'

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.click} />

            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <Navitems />
                </nav>
            </div>
        </Aux>

    );
}

export default sideDrawer;