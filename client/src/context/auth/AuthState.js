import React, {useReducer} from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({type: USER_LOADED, payload: res.data});
        } catch (err) {
            dispatch({type: AUTH_ERROR});
        }
    };

    const auth = async (data, url, successActionType, failActionType) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const result = await axios.post(url, data, config);
            dispatch({
                type: successActionType,
                payload: result.data // token
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: failActionType,
                payload: error.response.data.msg
            });
        }
    };

    const register = (formData) => {
        auth(formData, '/api/users', REGISTER_SUCCESS, REGISTER_FAIL);
    };

    const login = (formData) => {
        auth(formData, '/api/auth', LOGIN_SUCCESS, LOGIN_FAIL);
    };

    const logout = () => dispatch({type: LOGOUT});

    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
