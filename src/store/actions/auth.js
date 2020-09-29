import * as actionTypes from './actionsTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
};

const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenID: idToken,
        userID: localId
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('uerid');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeOut = (timer) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, timer * 1000)
    }
}

export const Auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const loginData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=_Enter_Your_Firebase_API_key';
        if (!isSignup) {
            URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=_Enter_Your_Firebase_API_key';
        }
        axios.post(URL, loginData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('uerid', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            }).catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const checkAtuhStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            const localId = localStorage.getItem('uerid');
            if (expirationTime <= new Date()) {
                dispatch(authLogout())
            } else {
                dispatch(authSuccess(token, localId));
                dispatch(checkAuthTimeOut((expirationTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}