import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    BOOK_ERROR,
    GET_BOOKS,
    GET_BOOK,
    DELETE_BOOK,
    ADD_BOOK,
    UPDATE_BOOK,
    GET_AUTHORS,
    AUTHOR_ERROR,
    GET_PUBLISHERS,
    PUBLISHER_ERROR
} from './types';

export const getBooks = () => async dispatch => {

    try {
        const res = await axios.get('/books/');
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: BOOK_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}
export const getBooksWithSort = (type, sortType) => async dispatch => {
    const body= JSON.stringify({
        type, sortType
    })
    console.log(body);
    try {
        const res = await axios.get('/books/sort', body);
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: BOOK_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}
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

export const getCurrentBook = (id) => async dispatch => {
    console.log(id);
    try {
        const res = await axios.get(`/books/${id}`);
        dispatch({
            type: GET_BOOK,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: BOOK_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const addBook = (data, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.post('/books/add', data, config);
        console.log(res);
        dispatch({
            type: ADD_BOOK,
            payload: res.data
        });
        dispatch(setAlert('Book Created', 'success'));
        history.push('/books');
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: BOOK_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const editBook = (id, data, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    for (var value of data.values()) {
        console.log(value); 
     }
    try {
        const res = await axios.post(`/books/update/${id}`, data, config);
        console.log(res);
        dispatch({
            type: UPDATE_BOOK,
            payload: res.data
        });
        dispatch(setAlert('Book Updated', 'success'));
        history.push('/books');
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: BOOK_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
}

export const deleteBook = (id) => async dispatch => {
    try {
        await axios.delete(`/books/${id}`);
        dispatch({
            type: DELETE_BOOK,
            payload: id
        });
        dispatch(setAlert('Book Removed', 'success'));
    } catch (error) {
        dispatch({
            type: BOOK_ERROR,
            payload: {
                msg: error.message
            }
        });
    }
    // dispatch({
    //     type:DELETE_BOOK,
    //     id
    // });
}