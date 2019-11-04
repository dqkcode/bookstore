import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { getBooks, deleteBook } from '../../../actions/books';
import { Button, Table, Divider } from 'antd';
const { Column } = Table;

const Books = ({ getBooks, deleteBook, book: { books, loading } }) => {
    useEffect(() => {
        getBooks();
    }, [getBooks]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
        <h1 className='large text-primary'>Books</h1>
        <Table dataSource={books} bordered="true" >
            <Column title="Cover" key="coverImage"
                render={(text, record) => (
                    <img src={require(`../../../../public/Images/bookCovers/${record.coverImage}`)} alt=''/>
                )}
            />
            <Column title="Title" dataIndex="title" key="title" ellipsis="true"/>
            <Column title="Description" dataIndex="description" key="description" ellipsis="true"/>
            <Column title="Publish Date" dataIndex="publishDate" key="publishDate" ellipsis="true"/>
            <Column title="Page Count" dataIndex="pageCount" key="pageCount" ellipsis="true"/>
            <Column title="Price" dataIndex="price" key="price" ellipsis="true"/>
            <Column title="Author" dataIndex="author.name" key="author" ellipsis="true"/>
            <Column title="Publisher" dataIndex="publisher.name" key="publisher" ellipsis="true" />
            <Column title="Discount" dataIndex="discount" key="discount" ellipsis="true"/>
            <Column
                title={<Link to='/create-book'>  
                            <Button type="primary" icon="plus"></Button> 
                        </Link>}
                key="id"
                render={(text, record) => (
                    <span>
                        <Link to={`edit-book/${record._id}`}> 
                            <Button  className="button" icon="edit"></Button>
                        </Link>
                    
                    <Divider type="vertical" />
                    <Button type="danger" className="button" icon="delete" onClick={() => deleteBook(record._id)}>
                    </Button>
                    </span>
                )}
             />
        </Table>
        </Fragment>
    );
};

Books.propTypes = {
    getBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    deleteBook: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    book: state.book,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { getBooks, deleteBook}
)(Books);