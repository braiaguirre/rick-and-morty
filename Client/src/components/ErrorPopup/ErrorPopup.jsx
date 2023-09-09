// STYLES
import styles from './ErrorPopup.module.css';

// DEPENDENCIES
import React from 'react';
import {useDispatch} from 'react-redux';

// ACTIONS
import {clearError} from '../../redux/actions/actions.js';

function ErrorPopup({errorMessage}) {
    const dispatch = useDispatch();

    function clearErrorHandler() {
        dispatch(clearError());
    }
    
    return (
        <div className={styles.errorPopup}>
            <h2>{errorMessage}</h2>
            <button onClick={clearErrorHandler}>Close</button>
        </div>
    )
}

export default ErrorPopup;