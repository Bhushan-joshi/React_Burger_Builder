import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';


const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: orderData,
        orderID: id
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (token, orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                console.log(res);
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}
const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token,userID) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const params='?auth='+token +'&orderBy=&equalTo="'+ userID +'"'
        axios.get('/orders.json' + params).then((res => {
            const fetchOrdersData = [];
            for (let key in res.data) {
                fetchOrdersData.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchOrdersData));
        })).catch(err => {
            dispatch(fetchOrdersFail(err));
        })
    }
}