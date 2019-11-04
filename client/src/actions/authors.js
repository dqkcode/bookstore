import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    AUTHOR_ERROR,
    GET_AUTHORS,
    GET_AUTHOR,
    DELETE_AUTHOR,
    ADD_AUTHOR,
    UPDATE_AUTHOR,
    ADD_AUTHORS_SUCCEEDED,
    ADD_AUTHORS_FAILED,
    DELETE_AUTHOR_SUCCEEDED,
    DELETE_AUTHOR_FAILED
} from './types';

export const getAuthors = () => async dispatch => {
    try {
        const res = await axios.get('/authors/');
        dispatch({
            type: GET_AUTHORS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: AUTHOR_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const getCurrentAuthor = (id) => async dispatch => {
    try {
        const res = await axios.get(`/authors/${id}`);
        dispatch({
            type: GET_AUTHOR,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: AUTHOR_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const addAuthor = (name, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const body = JSON.stringify({
            name
        });
        const res = await axios.post('/authors/add', body, config);
        console.log(res);
        dispatch({
            type: ADD_AUTHOR,
            payload: res.data
        });
        dispatch(setAlert('Author Created', 'success'));
        history.push('/authors');
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: AUTHOR_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
} 

export const editAuthor = (id, name, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const body = JSON.stringify({
            name
        });
        const res = await axios.post(`/authors/update/${id}`, body, config);

        dispatch({
            type: UPDATE_AUTHOR,
            payload: res.data
        });
        dispatch(setAlert('Author Updated!', 'success'));
        history.push('/authors');
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: AUTHOR_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const deleteAuthor = (id) => async dispatch => {
    try {
        await axios.delete(`/authors/${id}`);
        dispatch({
            type: DELETE_AUTHOR,
            payload: id
        });
        dispatch(setAlert('Author Removed', 'success'));
    } catch (error) {
        dispatch({
            type: AUTHOR_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
    // dispatch({
    //     type:DELETE_AUTHOR,
    //     id
    // });
}

// export const addAuthor = (name, history) => dispatch => {
//     dispatch({
//         type: ADD_AUTHOR,
//         name,
//         history
//     });
// }
export const addAuthorSucceeded = (response, history) => dispatch => {
    console.log(response+';;;;'+history);
    dispatch({
                type: ADD_AUTHORS_SUCCEEDED,
                payload: response
            });
            dispatch(setAlert('Author Created', 'success'));
            history.push('/authors');
}
export const addAuthorFailed = (error) => dispatch => {
    dispatch(setAlert('Something is wrong', 'error'));
    dispatch({
        type: ADD_AUTHORS_FAILED,
        payload: error
    });
}
export const deleteAuthorSucceeded = (response) => dispatch => {
    console.log(response);
    dispatch({
                type: DELETE_AUTHOR_SUCCEEDED,
                payload: response
            });
    dispatch(setAlert('Author Deleted', 'success'));
}
export const deleteAuthorFailed = (error) => dispatch => {
    dispatch(setAlert('Something is wrong', 'error'));
    dispatch({
        type: DELETE_AUTHOR_FAILED,
        payload: error
    });
}