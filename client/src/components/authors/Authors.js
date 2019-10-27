import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getAuthors, deleteAuthor } from '../../actions/authors';
import { Button, Table, Divider } from 'antd';

const { Column } = Table;


const Authors = ({ getAuthors, deleteAuthor, author: { authors, loading } }) => {
    useEffect(() => {
        getAuthors();
    }, [getAuthors]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
        <h1 className='large text-primary'>Authors</h1>
        <Table dataSource={authors} bordered="true" >
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Created At" dataIndex="createdAt" key="CreatedAt" ellipsis="true" width="20"/>
            <Column title="Updated At" dataIndex="updatedAt" key="UpdatedAt" />
            <Column
                title={<Link to='/create-author'>  
                            <Button type="primary" icon="plus">
                            </Button> 
                        </Link>}
                key="action"
                render={(text, record) => (
                    <span>
                        <Link to={`edit-author/${record._id}`}> 
                            <Button  className="button" icon="edit"></Button>
                        </Link>
                    
                    <Divider type="vertical" />
                    <Button type="danger" className="button" icon="delete" onClick={() => deleteAuthor(record._id)}>
                    </Button>
                    </span>
                )}
             />
        </Table>
        </Fragment>
    );
};

Authors.propTypes = {
    getAuthors: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
    deleteAuthor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    author: state.author
});

export default connect(
    mapStateToProps,
    { getAuthors, deleteAuthor}
)(Authors);