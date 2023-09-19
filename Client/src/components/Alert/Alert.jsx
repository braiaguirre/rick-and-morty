// STYLES
import styles from './Alert.module.css';

// DEPENDENCIES
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

// ACTIONS
import {clearAlert} from '../../redux/actions/actions.js';

function Alert() {

    // HOOKS
    const dispatch = useDispatch();

    // STATES
    const title = useSelector(state => state.alert.title);
    const message = useSelector(state => state.alert.message);
    const alertType = useSelector(state => state.alert.alertType);
    const action = useSelector(state => state.alert.action);

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
                    <button onClick={acceptAlertHandler}>Yes</button>
                    <button onClick={clearAlertHandler}>No</button>
                </>}
            {alertType === 'accept' && 
                <>
                    <button onClick={clearAlertHandler}>Accept</button>
                </>}
        </div>
    )
}

export default Alert;