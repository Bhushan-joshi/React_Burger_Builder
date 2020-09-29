import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spiner/Spinner';
import axios from '../../axios-orders';
import withErrorhandler from '../../HOC/withErrorHandler/withErrorHandler';
import *as actionCreator from '../../store/actions/index'

class Orders extends Component {
    componentDidMount() {
        this.props.onOrderFetch(this.props.token,this.props.userId);
    }
    render() {
        let order = <Spinner />;
        if (!this.props.loading) {
            order = (this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    totalPrice={+order.totalPrice} />
            )));
        }
        return (
            <React.Fragment>
                {order}
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token:state.auth.tokenID,
        userId:state.auth.userID
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderFetch: (token,userId) => dispatch(actionCreator.fetchOrders(token,userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(Orders, axios));