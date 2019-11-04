import React, {Fragment, useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addUser} from '../../../actions/users' ;
import { Form, Input, Button } from 'antd';

const CreateUser = ({addUser, history}) => {
    const [formData, setFormData]= useState({
        name:'',
        email:'',
        password:''
    })
    const { name, email, password } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addUser(formData, history);
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Create User</h1>
            <Form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <Input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required
                    />                   
                </div>
                <div className='form-group'>
                    <Input
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                    />
                </div>
                <div className='form-group'>
                    <Input
                    type='text'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    required
                    />
                </div>
                <Link to='/users'>  
                    <Button type="danger" >
                        Back
                    </Button> 
                </Link>
                <Button type="primary" htmlType="submit" className="button">
                    Create
                </Button>
            </Form>
        </Fragment>
    )
}

CreateUser.propTypes = {
    addUser:PropTypes.func.isRequired,
}

export default connect(null, {addUser})(withRouter(CreateUser));
