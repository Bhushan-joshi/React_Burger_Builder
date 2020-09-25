import React from 'react';
import Aux from '../../../HOC/Auxi/auxi';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return <li key={igkey}><span>{igkey}</span> :{props.ingredients[igkey]} </li>
        });

    return (
        <Aux>
            <h3>Your Order </h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h4> Total Price :- <strong>{props.totalPrice.toFixed(2)} $</strong></h4>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" click={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" click={props.purchaseContinued}>CONTINUE</Button> 
        </Aux>
    )
}

export default orderSummary;