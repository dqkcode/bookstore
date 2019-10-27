import {GET_AUTHORS, GET_AUTHORS_SUCCEEDED, GET_AUTHORS_FAILED, 
        ADD_AUTHOR,
        DELETE_AUTHOR} from '../actions/types';
//Saga effects
import { put, takeLatest, take} from 'redux-saga/effects';
import { authorApi } from './authorAPI';
import {addAuthorSucceeded, addAuthorFailed, 
    deleteAuthorSucceeded, deleteAuthorFailed} from './../actions/authors';

function* getAuthors() {
    try {
        const response = yield authorApi.getAuthorsAPI();   
        yield put({ type: GET_AUTHORS_SUCCEEDED, payload: response });     
    } catch (error) {    
        yield put({ type: GET_AUTHORS_FAILED, error: error });
    }
}

function* addAuthor() {
    try {
        const { name, history } = yield take(ADD_AUTHOR);
        const response = yield authorApi.addAuthorsAPI(name); 
        yield put(addAuthorSucceeded(response, history));
    } catch (error) {    
        yield put(addAuthorFailed(error));
    }
}
function* deleteAuthor() {
    try {
        const { id } = yield take(DELETE_AUTHOR);
        const response = yield authorApi.deleteAuthorsAPI(id); 
        yield put(deleteAuthorSucceeded(response));
    } catch (error) {    
        yield put(deleteAuthorFailed(error));
    }
}

export function* watchGetAuthors() {
        yield takeLatest(GET_AUTHORS, getAuthors);  
        yield takeLatest(ADD_AUTHOR, addAuthor);  
        yield takeLatest(DELETE_AUTHOR, deleteAuthor);
}