import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import BookItem from '../book/BookItem';
import { getBooksWithSort} from '../../../actions/books';

const Books = ({ getBooksWithSort, book: { books, loading } }) => {
    useEffect(() => {
        getBooksWithSort();
    }, [getBooksWithSort]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            
            <h1 className='large text-primary'>Books</h1>
            <div className="toolbar mb-30">
                <div className="shop-tab">
                    <div className="tab-3">
                        <ul>
                            <li><button onClick={() => getBooksWithSort('price', '-1')}>Price</button></li>
                            <li><a href="#">New</a></li>
                            <li><a href="#">Discount</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="tab-content">
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                        <div className='tab-content'>
                            {books.map(book => (
                                <BookItem key={book._id} book={book} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
        </Fragment>
    );
};

Books.propTypes = {
    getBooksWithSort: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    book: state.book
});

export default connect(
    mapStateToProps,
    { getBooksWithSort}
)(Books);