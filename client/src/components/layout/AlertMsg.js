import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Alert } from 'antd';
const AlertMsg = ({alerts})=>
    alert !==null &&
    alerts.length>0 &&
    alerts.map(alert=>(
        <Alert
            key={alert.id}
            description={alert.description}
            type={alert.alertType}
            showIcon
        />
    ))

AlertMsg.propTypes = {
    alerts:PropTypes.array.isRequired
};
const mapStateToProps =state=>({
    alerts:state.alert
});

export default connect(mapStateToProps)(AlertMsg);
