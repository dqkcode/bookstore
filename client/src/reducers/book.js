import {GET_BOOKS, GET_PUBLISHERS, GET_AUTHORS, GET_BOOK, ADD_BOOK,  
    BOOK_ERROR, DELETE_BOOK,  UPDATE_BOOK} from '../actions/types';

const initialState={
    books:[],
    authors:[],
    publishers:[],
    book:null,
    loading:true,
    error:{}
}

export default function(state=initialState, action){
    const {type,payload}=action;

    switch(type){
        case GET_BOOKS:
            return{
                ...state,
                books:payload,
                loading:false
            };
        case GET_AUTHORS:
            return{
                ...state,
                authors:payload,
                loading:false
            };
        case GET_PUBLISHERS:
            return{
                ...state,
                publishers:payload,
                loading:false
            };
        case ADD_BOOK:
            return {
                ...state,
                books: [payload, ...state.books],
                loading: false
            };
        case GET_BOOK:
        case UPDATE_BOOK:
            return{
                ...state,
                book:payload,
                loading:false
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book._id !== payload),
                loading: false
            };
        case BOOK_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            };
        default:
            return state;
    }
}