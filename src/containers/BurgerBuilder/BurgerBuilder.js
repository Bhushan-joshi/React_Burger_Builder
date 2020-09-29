import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../HOC/Auxi/auxi';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spiner/Spinner';
import * as actionCreator from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedcount = oldCount + 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedcount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice + priceAddition;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice
    //     });
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedcount = oldCount - 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedcount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice
    //     });
    // }

    purchasHandler = () => {
        if (this.props.isAuth) {
            this.setState({
                purchasing: true,
            })
        }else{
            this.props.history.push('/Signup');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        });
    }
    render() {

        const disabledInfo = { ...this.props.ing }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p style={{ textAlign: "center" }}>Ingredients can't be loaded..!</p> : <Spinner />

        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BurgerControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemove}
                        disabledInfo={disabledInfo}
                        ordered={this.purchasHandler}
                        totalPrice={this.props.totalPrice}
                        auth={this.props.isAuth}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ing}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.props.totalPrice}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Model show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuth:state.auth.tokenID !==null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreator.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actionCreator.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actionCreator.initIngredients()),
        onInitPurchase:()=>dispatch(actionCreator.purchaseInit())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));