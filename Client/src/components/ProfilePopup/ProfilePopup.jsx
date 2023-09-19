// STYLES
import styles from './ProfilePopup.module.css';

// HOOKS
import {useDispatch} from 'react-redux';

// ACTIONS
import {closePopup} from '../../redux/actions/actions';

function ProfilePopup() {

    // HOOKS
    const dispatch = useDispatch();

    // HANDLERS
    const closeHandler = () => dispatch(closePopup());

    return (
        <div className={styles.container} onClick={closeHandler}>
            <div className={styles.profilePopup}>
                <h3>Hi, Brian</h3>
                <ul>
                    <li>Profile</li>
                    <li>Preferences</li>
                    <li>Log Out</li>
                </ul>
            </div>
        </div>
    )
}

export default ProfilePopup;