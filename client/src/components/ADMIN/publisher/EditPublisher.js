import React, {Fragment, useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editPublisher, getCurrentPublisher} from '../../../actions/publishers' ;
import Spinner from '../../layout/Spinner';
import { Form, Input, Button } from 'antd';

const EditPublisher = ({editPublisher, getCurrentPublisher, publisher:{publisher, loading}, match, history}) => {
    const [formData, setFormData] = useState({
        name: ''
      });

    useEffect( ()  => {
        getCurrentPublisher(match.params.id);
        setFormData({
            name: !publisher ? '' : publisher.name
        });
    }, [getCurrentPublisher, match.params.id]);
    useEffect(() => {
        const _publisher = publisher || {}
        setFormData((value) => ({ ...value, ..._publisher }))
    }, [publisher]);

    const { name } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        editPublisher(match.params.id, formData, history);
    }

    return loading || publisher === null ? (
        <Spinner />
      ) : (
        <Fragment>
            <h1 className='large text-primary'>Edit Publisher</h1>
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
                    Edit
                </Button>
            </Form>
        </Fragment>
    )
}

EditPublisher.propTypes = {
    editPublisher:PropTypes.func.isRequired,
    publisher:PropTypes.object.isRequired,
    getCurrentPublisher:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    publisher:state.publisher
});

export default connect(mapStateToProps, {editPublisher, getCurrentPublisher})(withRouter(EditPublisher));


