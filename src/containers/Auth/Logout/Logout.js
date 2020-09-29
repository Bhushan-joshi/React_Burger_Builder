import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {authLogout} from '../../../store/actions/index';

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }
    render(){
        return <Redirect to='/'/>
    }
}

const mapDipathcToProps= dispatch=>{
    return {
        onLogout:()=>dispatch(authLogout())
    }
}

export default connect(null,mapDipathcToProps)(Logout);