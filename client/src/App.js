import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/AlertMsg';
import DashboardAdmin from './components/ADMIN/dashboard/Dashboard';

import AuthorsAdmin from './components/ADMIN/authors/Authors';
import CreateAuthorAdmin from './components/ADMIN/authors/CreateAuthor';
import EditAuthorAdmin from './components/ADMIN/authors/EditAuthor';

import PublishersAdmin from './components/ADMIN/publisher/Publishers';
import CreatePublisherAdmin from './components/ADMIN/publisher/CreatePublisher';
import EditPublisherAdmin from './components/ADMIN/publisher/EditPublisher';

import BooksAdmin from './components/ADMIN/book/Books';
import CreateBookAdmin from './components/ADMIN/book/CreateBook';
import EditBookAdmin from './components/ADMIN/book/EditBook';

import UsersAdmin from './components/ADMIN/users/Users';
import CreateUserAdmin from './components/ADMIN/users/CreateUser';
import EditUserAdmin from './components/ADMIN/users/EditUser';

import Home from './components/CLIENT/home/Home';
import BookDetail from './components/CLIENT/book/BookDetail';
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

                    
                    <section className='container'>
                        <Alert/>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/book-detail/:id" component={BookDetail}/>                        
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <PrivateRoute exact path='/dashboard' component={DashboardAdmin}/>
                            <PrivateRoute exact path='/authors' component={AuthorsAdmin}/>
                            <PrivateRoute exact path='/create-author' component={CreateAuthorAdmin}/>
                            <PrivateRoute exact path='/edit-author/:id' component={EditAuthorAdmin}/>
                            <PrivateRoute exact path='/publishers' component={PublishersAdmin}/>
                            <PrivateRoute exact path='/create-publisher' component={CreatePublisherAdmin}/>
                            <PrivateRoute exact path='/edit-publisher/:id' component={EditPublisherAdmin}/>
                            <PrivateRoute exact path='/books' component={BooksAdmin}/>
                            <PrivateRoute exact path='/create-book' component={CreateBookAdmin}/>
                            <PrivateRoute exact path='/edit-book/:id' component={EditBookAdmin}/>
                            <PrivateRoute exact path='/users' component={UsersAdmin}/>
                            <PrivateRoute exact path='/create-user' component={CreateUserAdmin}/>
                            <PrivateRoute exact path='/edit-user/:id' component={EditUserAdmin}/>
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;