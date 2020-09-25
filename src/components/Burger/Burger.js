import React from "react";
import {withRouter} from 'react-router-dom';

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
    let transFormedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_, i) => {
                return <BurgerIngredient key={igkey + i} type={igkey} />
            })
        })
        .reduce((prvarr, crval) => {
            return prvarr.concat(crval);
        }, []);

    if (transFormedIngredients.length === 0) {
        transFormedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transFormedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default withRouter(burger);