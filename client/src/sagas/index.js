import {call} from 'redux-saga/effects';
import {watchGetAuthors} from './authorSaga';

export default function* rootSaga() {
    yield call(watchGetAuthors);
}