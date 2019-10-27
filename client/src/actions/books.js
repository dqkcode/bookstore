import axios from 'axios';
import {setAlert} from './alert';
import {BOOK_ERROR, GET_BOOKS} from './types';

export const getBooks=()=> async dispatch=>{
    try {
        const res=await axios.get('/books/');
        dispatch({
            type:GET_BOOKS,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type:BOOK_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        });
    }
}