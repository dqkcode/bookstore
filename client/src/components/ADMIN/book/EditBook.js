import React, {Fragment, useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editBook, getCurrentBook, getAuthors, getPublishers } from '../../../actions/books' ;
import Spinner from '../../layout/Spinner';
import { Form, Input, Button } from 'antd';

const EditBook = ({editBook, getCurrentBook, getPublishers, getAuthors, book:{book, loading}, authors:{authors}, publishers:{publishers}, match, history}) => {

    const [formData, setFormData] = useState({
        coverImage:null,
        title:'',
        description:'',
        publishDate:null,
        pageCount:'', 
        price:'',
        author:'',
        publisher:'',
        discount:'',
      });

    useEffect( ()  => {
        getCurrentBook(match.params.id);

    }, [getCurrentBook, match.params.id]);
    useEffect(() => {
        const _book = book || {}
        setFormData((value) => ({ ...value, ..._book }))
    }, [book]);

    useEffect(() => {
        getPublishers();
        getAuthors();
    }, [getPublishers, getAuthors]);

    const { title, description, publishDate, pageCount,coverImage,  price, author, publisher, discount } = formData;

    const onChange = e =>{      
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const fileChangedHandler =  (e) => {
        setFormData({ ...formData, coverImage: e.target.files[0] });
    }     

    const onSubmit = async e => {
        e.preventDefault(); 
        var data= new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('publishDate', publishDate);
        data.set('pageCount', pageCount);
        data.set('price', price);
        data.set('author', author);
        data.set('publisher', publisher);
        data.set('discount', discount);
        data.append('coverImage', formData.coverImage);
        
        editBook(match.params.id, data, history);
    }

    return loading || book === null || authors === null || publishers === null ? (
        <Spinner />
      ) : (
        <Fragment>
            <h1 className='large text-primary'>Edit Book</h1>
            <Form className='form' onSubmit={e => onSubmit(e)} enctype="multipart/form-data">
                <div className='form-group'>
                    <Input
                        type='text'
                        placeholder='Title'
                        name='title'
                        value={title}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <Input
                        type='number'
                        min='1'
                        placeholder='Page Count'
                        name='pageCount'
                        value={pageCount}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <Input
                        type='number'
                        min='1000'
                        placeholder='VNĐ'
                        name='price'
                        value={price}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <Input
                        type='date'
                        placeholder='Publish Date'
                        name='publishDate'
                        value={publishDate}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    
                    <select name='author' value={author.id}  onChange={e => onChange(e)} required>
                        {authors.map(function(item, i){
                            return <option value={item._id} key={i}> {item.name} </option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <select name='publisher' value={publisher.id}  onChange={e => onChange(e)} required>
                        {publishers.map(function(item, i){
                            return <option value={item._id} key={i}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <Input
                        type='text'
                        placeholder='Discount'
                        name='discount'
                        value={discount}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                <img src={require(`../../../../public/Images/bookCovers/${book.coverImage}`)} width="250px" height="300px" alt=''/>
                </div> 
                <div className='form-group'>
                    <input type="file" name="coverImage" required onChange={e => fileChangedHandler(e)}/>
                </div>  
                <div className='form-group'>
                    <Input.TextArea
                        type='textarea'
                        placeholder='Description'
                        name='description'
                        value={description}
                        onChange={e => onChange(e)}
                    />
                </div>

                <Link to='/books'>  
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

EditBook.propTypes = {
    editBook:PropTypes.func.isRequired,
    book:PropTypes.object.isRequired,
    getCurrentBook:PropTypes.func.isRequired,
    getAuthors:PropTypes.func.isRequired,
    getPublishers:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    book:state.book,
    authors:state.book,
    publishers:state.book,
});

export default connect(mapStateToProps, {editBook, getCurrentBook, getAuthors, getPublishers})(withRouter(EditBook));


