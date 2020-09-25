import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            //['salad','1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price })
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();

    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-form');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    CheckoutCancelled={this.checkoutCancelledHandler}
                    CheckoutContinue={this.checkoutContinueHandler}
                />
                <Route
                    path='/checkout/contact-form'
                    render={(props) => (<ContactData ingredients={this.state.ingredients} {...props} price={this.state.totalPrice} />)} />
            </div>
        );
    }
}

export default Checkout;