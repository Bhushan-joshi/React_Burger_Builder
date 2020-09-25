import React, { Component } from 'react';

import Aux from '../../HOC/Auxi/auxi';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spiner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(response => {
            this.setState({ ingredients: response.data })
        }).catch(err => {
            this.setState({ error: true });
            console.log(err);
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedcount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedcount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedcount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedcount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
    }

    purchasHandler = () => {
        this.setState({
            purchasing: true,
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString= queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString,
        });
    }
    render() {

        const disabledInfo = { ...this.state.ingredients }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p style={{ textAlign: "center" }}>Ingredients can't be loaded..!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        ordered={this.purchasHandler}
                        totalPrice={this.state.totalPrice}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);