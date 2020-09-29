import *as actionTypes from '../actions/actionsTypes';

const initialState = {
    tokenID: null,
    userID: null,
    error: null,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error:action.error
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                tokenID:action.tokenID,
                userID:action.userID,
                error:null,
                loading:false
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                tokenID:null,
                userID:null,
                error:null,
                loading:false,
            }
        default:
            return state;
    }
}
export default reducer;