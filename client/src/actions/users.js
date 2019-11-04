import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    USER_ERROR,
    GET_USERS,
    GET_USER,
    DELETE_USER,
    ADD_USER,
    UPDATE_USER,
} from './types';

export const getUsers = () => async dispatch => {
    
    try {
        const res = await axios.get('/users/all');
        console.log(res);
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const getCurrentUser = (id) => async dispatch => {
    console.log(id);
    try {
        const res = await axios.get(`/users/${id}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const addUser = (formData, history) => async dispatch => {
    console.log(formData);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/users/add', formData, config);
        console.log(res);
        
        dispatch({
            type: ADD_USER,
            payload: res.data
        });
        dispatch(setAlert('User Created', 'success'));
        history.push('/users');
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
} 



export const editUser = (id, formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/users/update/${id}`, formData, config);

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        });
        dispatch(setAlert('User Updated!', 'success'));
        history.push('/users');
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const deleteUser = (id) => async dispatch => {
    try {
        await axios.delete(`/users/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: id
        });
        dispatch(setAlert('User Removed', 'success'));
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
    // dispatch({
    //     type:DELETE_USER,
    //     id
    // });
}