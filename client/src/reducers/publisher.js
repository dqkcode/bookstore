import {GET_PUBLISHERS, PUBLISHER_ERROR} from '../actions/types';

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
            }
        case PUBLISHER_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state;
    }
}