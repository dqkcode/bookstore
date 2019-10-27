import React, {Fragment, useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editAuthor, getCurrentAuthor} from '../../actions/authors' ;
import Spinner from '../layout/Spinner';
import { Form, Input, Button } from 'antd';

const EditAuthor = ({editAuthor, getCurrentAuthor, author:{author, loading}, match, history}) => {
    const [formData, setFormData] = useState({
        name: ''
      });

    useEffect( ()  => {
        getCurrentAuthor(match.params.id);
        setFormData({
            name: !author ? '' : author.name
        });
    }, [getCurrentAuthor, match.params.id]);
    useEffect(() => {
        const _author = author || {}
        setFormData((value) => ({ ...value, ..._author }))
    }, [author]);

    const { name } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        editAuthor(match.params.id, name, history);
    }

    return loading || author === null ? (
        <Spinner />
      ) : (
        <Fragment>
            <h1 className='large text-primary'>Edit Author</h1>
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
                    Edit
                </Button>
            </Form>
        </Fragment>
    )
}

EditAuthor.propTypes = {
    editAuthor:PropTypes.func.isRequired,
    author:PropTypes.object.isRequired,
    getCurrentAuthor:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    author:state.author
});

export default connect(mapStateToProps, {editAuthor, getCurrentAuthor})(withRouter(EditAuthor));


