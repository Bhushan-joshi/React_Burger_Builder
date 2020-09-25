import React from 'react';
import classes from './Order.module.css';

const order = (props)=>{
    const ingredients=[];
    for(let ingredientsname in props.ingredients){
        ingredients.push({
            name:ingredientsname,
            amount:props.ingredients[ingredientsname]
        })
    }
    const ordersname=ingredients.map(ig=>{
        return <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:' 0 8px',
            padding:'0 5px',
            border:'1px solid #ccc',
        }}
        key={ig.name}>{ig.name} {(ig.amount)}</span>
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients:{ordersname}</p>
            <p>Total price <strong>{props.totalPrice.toFixed(2)} USD</strong></p>
        </div>
    )
}

export default order;