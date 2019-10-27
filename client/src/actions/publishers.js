import axios from 'axios';
import {setAlert} from './alert';
import {PUBLISHER_ERROR, GET_PUBLISHERS, ADD_PUBLISHER, DELETE_PUBLISHER} from './types';

export const getPublishers=()=> async dispatch=>{
    try {
        const res=await axios.get('/publishers/');
        dispatch({
            type:GET_PUBLISHERS,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type:PUBLISHER_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        });
    }
}

export const addPublisher = (name) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const body = JSON.stringify({
            name
        });
        const res = await axios.post('/publishers/add', body, config);

        dispatch({
            type: ADD_PUBLISHER,
            payload: res.data
        });
        dispatch(setAlert('Publisher Created', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PUBLISHER_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}