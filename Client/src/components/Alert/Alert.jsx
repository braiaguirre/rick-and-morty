// STYLES
import styles from './Alert.module.css';

// DEPENDENCIES
import React from 'react';
import {useDispatch} from 'react-redux';

// ACTIONS
import {clearAlert} from '../../redux/actions/actions.js';

function Alert({title, message, alertType, action}) {

    // HOOKS
    const dispatch = useDispatch();

    // HANDLERS
    const clearAlertHandler = () => dispatch(clearAlert());
    
    const acceptAlertHandler = () => {
        dispatch(action);
        dispatch(clearAlert());
    }

    return (
        <div className={styles.alert}>
            <h2>{title}</h2>
            <p>{message}</p>
            {alertType === 'yesno' && 
                <>
                    <button onClick={clearAlertHandler}>No</button>
                    <button onClick={acceptAlertHandler}>Yes</button>
                </>}
            {alertType === 'accept' && 
                <>
                    <button onClick={clearAlertHandler}>Accept</button>
                </>}
        </div>
    )
}

export default Alert;