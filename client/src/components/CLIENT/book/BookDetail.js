import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCurrentBook } from '../../../actions/books' ;
import Spinner from '../../layout/Spinner';

const BookDetail = ({ getCurrentBook, book:{book, loading}, match}) => {
    useEffect( ()  => {
        getCurrentBook(match.params.id);
    }, [getCurrentBook, match.params.id]);

    return loading || book === null ? (
        <Spinner />
      ) : (
        <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                <div className="col-md-5 col-sm-5 col-xs-12">
                    <div className="product-details-large tab-content">
                        <img src={require(`../../../../public/Images/bookCovers/${book.coverImage}`)} width="300px" height="500px" alt="" />
                    </div>                   
                </div>
                <div className="col-md-7 col-sm-7 col-xs-12">
                    <h1>{book.title}</h1>
                    <div class="product-info-price">
                        <div class="price-final">
                            {book.discount !==null ? (
                                <Fragment>
                                    <span>VNĐ {book.price - (book.price * book.discount)/100}</span>
                                    <span className="old-price">{book.price}</span>
                                </Fragment>
                                
                            ) : (
                                <Fragment>
                                    <span>VNĐ {book.price}</span>
                                </Fragment>
                            )}
                        </div>
                        
                    </div>
                    <p>{book.description}</p>                                
                </div>
            </div>
        </div>
    )
}

BookDetail.propTypes = {
    editAuthor:PropTypes.func.isRequired,
    book:PropTypes.object.isRequired,
    getCurrentBook:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    book:state.book
});

export default connect(mapStateToProps, {getCurrentBook})(BookDetail);


