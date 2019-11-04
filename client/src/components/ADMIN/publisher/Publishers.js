import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { getPublishers, deletePublisher } from '../../../actions/publishers';
import { Button, Table, Divider } from 'antd';

const { Column } = Table;

const Publishers = ({ getPublishers, deletePublisher, publisher: { publishers, loading } }) => {
    useEffect(() => {
        getPublishers();
    }, [getPublishers]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
        <h1 className='large text-primary'>Publishers</h1>
        <Table dataSource={publishers} bordered="true" >
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Created At" dataIndex="createdAt" key="CreatedAt" ellipsis="true" width="20"/>
            <Column title="Updated At" dataIndex="updatedAt" key="UpdatedAt" />
            <Column
                title={<Link to='/create-publisher'>  
                            <Button type="primary" icon="plus">
                            </Button> 
                        </Link>}
                key="action"
                render={(text, record) => (
                    <span>
                        <Link to={`edit-publisher/${record._id}`}> 
                            <Button  className="button" icon="edit"></Button>
                        </Link>
                    
                    <Divider type="vertical" />
                    <Button type="danger" className="button" icon="delete" onClick={() => deletePublisher(record._id)}>
                    </Button>
                    </span>
                )}
             />
        </Table>
        </Fragment>
    );
};

Publishers.propTypes = {
    getPublishers: PropTypes.func.isRequired,
    publisher: PropTypes.object.isRequired,
    deletePublisher: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    publisher: state.publisher
});

export default connect(
    mapStateToProps,
    { getPublishers, deletePublisher}
)(Publishers);