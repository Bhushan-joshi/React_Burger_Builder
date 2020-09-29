import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spiner/Spinner'


class Checkout extends Component {
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();

    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-form');
    }

    render() {
        let summary = <Spinner />
        if (this.props.ing) {
            const purchaseRedirect= this.props.purchased? <Redirect to='/'/>:null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        CheckoutCancelled={this.checkoutCancelledHandler}
                        CheckoutContinue={this.checkoutContinueHandler}
                    />
                    <Route
                        path='/checkout/contact-form'
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps )(Checkout);