import React, { Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import  {getCurrentProfile} from '../../actions/profile';
import { PageHeader, Divider } from 'antd';

const NavbarAdmin = ({getCurrentProfile, auth: {user, isAuthenticated }, profile:{profile, loading }, logout }) => {
  useEffect(()=>{
    getCurrentProfile();
  },[getCurrentProfile]);

  const adminLinks = (
    <>
        Welcome, {user && user.name}
        <Divider type="vertical" />
        <Link to='/books'>
          <i className='fas fa-book' />
          <span className='hide-sm'>Book</span>
        </Link>
        <Divider type="vertical" />
        <Link to='/authors'>
          <i className='fa fa-bookmark' />
          <span className='hide-sm'>Author</span>
        </Link>
        <Divider type="vertical" />
        <Link to='/publishers'>
          <i className='fa fa-business-time' />
          <span className='hide-sm'>Publisher</span>
        </Link>
        <Divider type="vertical" />
        <Link to='/users'>
          <i className='fa fa-users' />
          <span className='hide-sm'>Users</span>
        </Link>
        <Divider type="vertical" />
        <Link to='/dashboard'>
          <i className='fa fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
        <Divider type="vertical" />
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
    </>
  );
  const authLinks = (
    <>
        Welcome, {user && user.name}
        <Divider type="vertical" />
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
    </>
  );

  const guestLinks = (
    <>
      <Link to='/login'>
        <i className='fas fa-sign-in-alt' />{' '}
          <span className='hide-sm'>Login</span>
      </Link>
      <Divider type="vertical" />
      <Link to='/register'>
        <i className='fas fa-pen-alt' />{' '}
          <span className='hide-sm'>Register</span>
      </Link>
    </>
        
  );

  return (
    <PageHeader
    style={{
      border: '1px solid rgb(235, 237, 240)',
      background:'#f2f2f2'
    }}
    title={<Link to="/">BookWebStore</Link>}
    extra={[
      !loading && (
        <Fragment>
          {isAuthenticated && profile!==null && profile.email==='admin@g.com'?adminLinks
            :isAuthenticated ? authLinks
            :guestLinks}
        </Fragment>
    )
    ]}
    />
  );
};

NavbarAdmin.propTypes = {
    logout: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
  mapStateToProps,
  { logout, getCurrentProfile }
)(NavbarAdmin);