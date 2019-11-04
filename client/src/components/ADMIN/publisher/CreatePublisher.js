import React, {Fragment, useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPublisher} from '../../../actions/publishers' ;
import { Form, Input, Button } from 'antd';

const CreatePublisher = ({addPublisher, history}) => {
    const [formData, setFormData]= useState({
        name:''
    })
    const { name } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addPublisher(formData, history);
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Create Publisher</h1>
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
                <Link to='/publishers'>  
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

CreatePublisher.propTypes = {
    addPublisher:PropTypes.func.isRequired,
}

export default connect(null, {addPublisher})(withRouter(CreatePublisher));
