import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
]

let disable = true;

const buildControls = (props) => {
    props.totalPrice.toFixed(2) > 5.00 ? disable = false : disable = true
    return (<div className={classes.BuildControls}>
        <p>Total Price : <strong>{props.totalPrice.toFixed(2)} $</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.addIngredient(ctrl.type)}
                remove={() => props.removeIngredient(ctrl.type)}
                disabled={props.disabledInfo[ctrl.type]}
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={disable}
        onClick={props.ordered}>{props.auth ?'CHECKOUT NOW':'SIGN UP TO ORDER'}</button>
    </div>
    )
};

export default buildControls;