import React, { Component } from 'react';
import {connect} from 'react-redux';
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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.token}
                  />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    click={this.sideDrawerToggleHandler} 
                    isAuth={this.props.token}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps= state=>{
    return{
        token:state.auth.tokenID !==null
    }
}

export default connect(mapStateToProps)(Layout);