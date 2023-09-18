// STYLES
import styles from './Error404.module.css';

// DEPENDENCIES
import {useNavigate} from 'react-router-dom';

function Error404() {

    // HOOKS
    const navigate = useNavigate();

    // HANDLERS
    const navigateHandler = () => {
        navigate('/home');
    }

    return (
        <div className={styles.error404}>
            <div>
                <h1>You shouldn't be here.</h1>
            </div>
            <div>
                <button onClick={navigateHandler}>Get out</button>
            </div>
        </div>
    )
}

export default Error404;