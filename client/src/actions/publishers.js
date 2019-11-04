import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    PUBLISHER_ERROR,
    GET_PUBLISHERS,
    GET_PUBLISHER,
    DELETE_PUBLISHER,
    ADD_PUBLISHER,
    UPDATE_PUBLISHER,
} from './types';

export const getPublishers = () => async dispatch => {
    try {
        const res = await axios.get('/publishers/');
        dispatch({
            type: GET_PUBLISHERS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: PUBLISHER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const getCurrentPublisher = (id) => async dispatch => {
    try {
        const res = await axios.get(`/publishers/${id}`);
        dispatch({
            type: GET_PUBLISHER,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: PUBLISHER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const addPublisher = (formData, history) => async dispatch => {
    try {
        const res = await axios.post('/publishers/add', formData);
        console.log(res);
        dispatch({
            type: ADD_PUBLISHER,
            payload: res.data
        });
        dispatch(setAlert('Publisher Created', 'success'));
        history.push('/publishers');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: PUBLISHER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
} 



export const editPublisher = (id, formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/publishers/update/${id}`, formData, config);

        dispatch({
            type: UPDATE_PUBLISHER,
            payload: res.data
        });
        dispatch(setAlert('Publisher Updated!', 'success'));
        history.push('/publishers');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: PUBLISHER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const deletePublisher = (id) => async dispatch => {
    try {
        await axios.delete(`/publishers/${id}`);
        dispatch({
            type: DELETE_PUBLISHER,
            payload: id
        });
        dispatch(setAlert('Publisher Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PUBLISHER_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
    // dispatch({
    //     type:DELETE_PUBLISHER,
    //     id
    // });
}