import React, { Component } from 'react';
import Aux from '../Auxi/auxi';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/Sidedrower/Sidedrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    // sideDrawerClosedHandler = () => {
    //     this.setState({ showSideDrawer: true });
    // }

    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return { showSideDrawer : ! prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    click={this.sideDrawerToggleHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;