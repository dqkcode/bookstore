import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { PageHeader } from 'antd';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <>
        <Link to='/books'>
          <i className='fas fa-book' />
          <span className='hide-sm'>Book</span>
        </Link>
        <Link to='/authors'>
          <i className='fa fa-bookmark' />
          <span className='hide-sm'>Author</span>
        </Link>
        <Link to='/publishers'>
          <i className='fa fa-business-time' />
          <span className='hide-sm'>Publisher</span>
        </Link>
        <Link to='/dashboard'>
          <i className='fa fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
    </>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <PageHeader
    style={{
      border: '1px solid rgb(235, 237, 240)',
      background:'#f2f2f2'
    }}
    title="WebBookStore"
    extra={[
      !loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    )
    ]}
    />
  );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);