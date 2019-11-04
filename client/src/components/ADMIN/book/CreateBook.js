import React, {Fragment, useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addBook, getPublishers, getAuthors} from '../../../actions/books' ;
import { Form, Input, Button} from 'antd';

const CreateBook = ({addBook, getPublishers, getAuthors, authors:{authors}, publishers:{publishers}, history}) => {
    useEffect(() => {
        getPublishers();
        getAuthors();
    }, [getPublishers, getAuthors]);

    const [formData, setFormData]= useState({
        coverImage:null,
        title:'',
        description:'',
        publishDate:null,
        pageCount:'', 
        price:'',
        author:'',
        publisher:'',
        discount:'',
    })
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
        
        addBook(data, history);
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Create Book</h1>
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
                    <select name='author' value={author.id} onChange={e => onChange(e)} required>
                        {authors.map(function(item, i){
                            return <option value={item._id} key={i}> {item.name} </option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <select name='publisher' value={publisher.id} onChange={e => onChange(e)} required>
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
                    Create
                </Button>
            </Form>
        </Fragment>
    )
}

CreateBook.propTypes = {
    addBook:PropTypes.func.isRequired,
    getAuthors:PropTypes.func.isRequired,
    getPublishers:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    authors:state.book,
    publishers:state.book,
});

export default connect(mapStateToProps, {addBook, getAuthors, getPublishers})(withRouter(CreateBook));
