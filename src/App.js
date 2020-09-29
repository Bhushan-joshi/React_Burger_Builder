import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './HOC/Layout/Layout'
import Burger from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
  }
  render() {
    let render = (
      <Switch>
        <Route path='/Signup'  component={Auth} />
        <Route path="/" component={Burger} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuth) {
      render = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path="/" component={Burger} />
        </Switch>
      )
    }
    return (
      <div >
        <Layout>
          <Switch>
          {render}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.tokenID !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.checkAtuhStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
