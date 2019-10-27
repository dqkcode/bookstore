import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navbar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/routing/PrivateRoute';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/AlertMsg';
import Dashboard from './components/dashboard/Dashboard';
import Authors from './components/authors/Authors';
import CreateAuthor from './components/authors/CreateAuthor';
import EditAuthor from './components/authors/EditAuthor';
// import Publishers from './components/publisher/Publishers';
// import CreatePublisher from './components/publisher/CreatePublisher';
// import EditPublisher from './components/publisher/EditPublisher';
// import Books from './components/book/Books';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}



const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />

                    <Route exact path="/" component={Landing}/>
                    <section className='container'>
                        <Alert/>
                        <Switch>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                        <PrivateRoute exact path='/authors' component={Authors}/>
                        <PrivateRoute exact path='/create-author' component={CreateAuthor}/>
                        <PrivateRoute exact path='/edit-author/:id' component={EditAuthor}/>
                        {/* <PrivateRoute exact path='/publishers' component={Publishers}/>
                        <PrivateRoute exact path='/create-publisher' component={CreatePublisher}/>
                        <PrivateRoute exact path='/edit-publisher' component={EditPublisher}/>
                        <PrivateRoute exact path='/books' component={Books}/> */}
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;