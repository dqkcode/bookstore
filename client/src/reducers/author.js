import {GET_AUTHOR, GET_AUTHORS_SUCCEEDED, GET_AUTHORS_FAILED,  
    ADD_AUTHORS_SUCCEEDED, ADD_AUTHORS_FAILED,
    AUTHOR_ERROR, DELETE_AUTHOR,  UPDATE_AUTHOR} from '../actions/types';

const initialState={
    authors:[],
    author:null,
    loading:true,
    error:{}
}

export default function(state=initialState, action){
    const {type,payload}=action;

    switch(type){
        // case GET_AUTHORS:
        //     return{
        //         ...state,
        //         authors:payload,
        //         loading:false
        //     };
        case GET_AUTHORS_SUCCEEDED:
            return{
                ...state,
                authors:payload,
                loading:false
            };
        case GET_AUTHORS_FAILED:
            return{
                ...state,
                error:payload,
                loading:false
            };
        case GET_AUTHOR:
        case UPDATE_AUTHOR:
            return{
                ...state,
                author:payload,
                loading:false
            };
        case ADD_AUTHORS_SUCCEEDED:    
            return {
                ...state,
                authors: [payload, ...state.authors],
                loading: false
            };
        case DELETE_AUTHOR:
            return {
                ...state,
                authors: state.authors.filter(author => author._id !== payload),
                loading: false
            };
        case AUTHOR_ERROR:
        case ADD_AUTHORS_FAILED:
            return{
                ...state,
                error:payload,
                loading:false
            };
        default:
            return state;
    }
}