// STYLES
import styles from './Alert.module.css';

// DEPENDENCIES
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {clearAlert} from '../../redux/actions/actions.js';

function Alert({message, alertType, action}) {
    const dispatch = useDispatch();
    
    function clearAlertHandler() {
        dispatch(action);
        dispatch(clearAlert());
    }

    return (
        <div className={styles.alert}>
            <h2>Wait!</h2>
            <p>{message}</p>
            <button onClick={clearAlertHandler}>Close</button>
        </div>
    )
}

export default Alert;