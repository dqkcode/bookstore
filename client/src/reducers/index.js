import {
  combineReducers
} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import author from './author';
import publisher from './publisher';
import book from './book';
import user from './user';

// export default combineReducers({
//   alert,
//   auth,
//   profile,
//   author,
//   publisher,
//   book,
//   user
// });

export const appReducer = combineReducers({
    alert,
    auth,
    profile,
    author,
    publisher,
    book,
    user
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}