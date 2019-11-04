import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import  {getCurrentProfile} from '../../actions/profile';


const PrivateRoute = ({getCurrentProfile, component:Component, auth:{ isAuthenticated}, profile:{profile, loading}, ...rest}) => {
    useEffect(()=>{
        getCurrentProfile();
      },[getCurrentProfile]);
    return(
        <Route {...rest} render={props=>!isAuthenticated && !loading && profile.email!=='admin@g.com' ?
        (<Redirect to='/'/>) : (<Component {...props}/>)}/>
    )
    
}

PrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        profile: state.profile
    }
}

export default connect(mapStateToProps, {getCurrentProfile})(PrivateRoute)
