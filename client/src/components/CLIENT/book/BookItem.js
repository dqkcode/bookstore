import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const BookItem = ({book: { _id, title, coverImage, price, discount}}) => {
    const discountDiv=(
        <div className="product-flag">
            <ul>
                <li><span className="discount-percentage">-{discount}%</span></li>
            </ul>
        </div>
    )
    const truePrice= price - (price * discount)/100;
    
    return (
        <div className="product-wrapper mb-40">
            <div className="product-img">
                <Link to={`book-detail/${_id}`}>
                    <img src={require(`../../../../public/Images/bookCovers/${coverImage}`)} width="200" height="180" alt="book" className="primary" />
                </Link>

                <Fragment>{discount!=null?discountDiv:null}</Fragment>
                
            </div>
            <div className="product-details text-center">
                <h4><Link to={`book-detail/${_id}`}>{title.length <= 20 ? title : title.substring(0,20)+'...'}</Link></h4>
                <div className="product-price">
                    <ul>
                        <li>VNĐ {discount!==null?truePrice:price}</li>
                    </ul>
                </div>
            </div>	
        </div>
    )
}

BookItem.propTypes = {
    book: PropTypes.object.isRequired,
}

export default BookItem;

