// STYLES
import styles from './ProfilePopup.module.css';

// HOOKS
import {useDispatch} from 'react-redux';

// ACTIONS
import {sendAlert, removeAccess, createPopup, closePopup} from '../../redux/actions/actions';

function ProfilePopup() {

    // HOOKS
    const dispatch = useDispatch();

    // HANDLERS
    const closeHandler = () => dispatch(closePopup());
    const logOut = () => dispatch(sendAlert('Wait!', 'Are you sure you want to leave?', 'yesno', () => dispatch(removeAccess())));
    const profileHandler = () => dispatch(createPopup('PROFILE_EDIT'));
    const preferencesHandler = () => dispatch(createPopup('PREFERENCES_EDIT'));

    return (
        <div className={styles.container} onClick={closeHandler}>
            <div className={styles.profilePopup}>
                <h3>Hi, Brian</h3>
                <ul>
                    <li>Profile</li>
                    <li>Preferences</li>
                    <li onClick={logOut}>Log Out</li>
                </ul>
            </div>
        </div>
    )
}

export default ProfilePopup;