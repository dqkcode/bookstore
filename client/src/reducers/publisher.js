import {GET_PUBLISHERS, GET_PUBLISHER, ADD_PUBLISHER,  
    PUBLISHER_ERROR, DELETE_PUBLISHER,  UPDATE_PUBLISHER} from '../actions/types';

const initialState={
    publishers:[],
    publisher:null,
    loading:true,
    error:{}
}

export default function(state=initialState, action){
    const {type,payload}=action;

    switch(type){
        case GET_PUBLISHERS:
            return{
                ...state,
                publishers:payload,
                loading:false
            };
        case ADD_PUBLISHER:
            return {
                ...state,
                publishers: [payload, ...state.publishers],
                loading: false
            };
        case GET_PUBLISHER:
        case UPDATE_PUBLISHER:
            return{
                ...state,
                publisher:payload,
                loading:false
            };
        case DELETE_PUBLISHER:
            return {
                ...state,
                publishers: state.publishers.filter(publisher => publisher._id !== payload),
                loading: false
            };
        case PUBLISHER_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            };
        default:
            return state;
    }
}