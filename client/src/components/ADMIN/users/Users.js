import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { getUsers, deleteUser } from '../../../actions/users';
import { Button, Table, Divider } from 'antd';

const { Column } = Table;


const Users = ({ getUsers, deleteUser, user: { users, loading } }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
        <h1 className='large text-primary'>Users</h1>
        <Table dataSource={users} bordered="true" >
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Created At" dataIndex="createdAt" key="CreatedAt" ellipsis="true"/>
            <Column title="Updated At" dataIndex="updatedAt" key="UpdatedAt" ellipsis="true"/>
            <Column
                title={<Link to='/create-user'>  
                            <Button type="primary" icon="plus">
                            </Button> 
                        </Link>}
                key="action"
                render={(text, record) => (
                    <span>
                        <Link to={`edit-user/${record._id}`}> 
                            <Button  className="button" icon="edit"></Button>
                        </Link>
                    
                    <Divider type="vertical" />
                    <Button type="danger" className="button" icon="delete" onClick={() => deleteUser(record._id)}>
                    </Button>
                    </span>
                )}
             />
        </Table>
        </Fragment>
    );
};

Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    { getUsers, deleteUser}
)(Users);