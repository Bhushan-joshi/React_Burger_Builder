import React from 'react';
import Burger from '../../Burger/Burger';
import Btn from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const checkout = (props) => {
    return (
        <div className={classes.Checkout}>
            <h1>We hope it testes well</h1>
            <div style={{ width: '100%', height: '300px', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Btn btnType="Danger" click={props.CheckoutCancelled}>CANCEL</Btn>
            <Btn btnType="Success" click={props.CheckoutContinue}>CONTINUE</Btn>
        </div>
    );
}

export default checkout;