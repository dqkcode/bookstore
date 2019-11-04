import React, {Fragment, useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addAuthor} from '../../../actions/authors' ;
import { Form, Input, Button } from 'antd';

const CreateAuthor = ({addAuthor, history}) => {
    const [formData, setFormData]= useState({
        name:''
    })
    const { name } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addAuthor(name, history);
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Create Author</h1>
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
                <Link to='/authors'>  
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

CreateAuthor.propTypes = {
    addAuthor:PropTypes.func.isRequired,
}

export default connect(null, {addAuthor})(withRouter(CreateAuthor));
