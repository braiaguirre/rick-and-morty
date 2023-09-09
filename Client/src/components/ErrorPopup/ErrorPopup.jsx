// STYLES
import styles from './ErrorPopup.module.css';

// DEPENDENCIES
import React from 'react';
import {useDispatch} from 'react-redux';

// ACTIONS
import {clearError} from '../../redux/actions/actions.js';

function ErrorPopup({error, desc}) {
    const dispatch = useDispatch();

    // CLEAR ERROR HANDLER
    function clearErrorHandler() {
        dispatch(clearError());
    }
    
    return (
        <div className={styles.errorPopup}>
            <h2>{error}</h2>
            <p>{desc}</p>
            <button onClick={clearErrorHandler}>Close</button>
        </div>
    )
}

export default ErrorPopup;