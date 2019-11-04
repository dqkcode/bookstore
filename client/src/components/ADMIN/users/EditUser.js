import React, {Fragment, useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editUser, getCurrentUser} from '../../../actions/users' ;
import Spinner from '../../layout/Spinner';
import { Form, Input, Button } from 'antd';

const EditUser = ({editUser, getCurrentUser, user:{user, loading}, match, history}) => {
    const [formData, setFormData] = useState({
        name: '',
      });

    useEffect( ()  => {
        getCurrentUser(match.params.id);
        setFormData({
            name: !user ? '' : user.name,
        });
    }, [getCurrentUser, match.params.id]);
    useEffect(() => {
        const _user = user || {}
        setFormData((value) => ({ ...value, ..._user }))
    }, [user]);

    const { name } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        editUser(match.params.id, formData, history);
    }

    return loading || user === null ? (
        <Spinner />
      ) : (
        <Fragment>
            <h1 className='large text-primary'>Edit User</h1>
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
                <Link to='/users'>  
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

EditUser.propTypes = {
    editUser:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    getCurrentUser:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    user:state.user
});

export default connect(mapStateToProps, {editUser, getCurrentUser})(withRouter(EditUser));


