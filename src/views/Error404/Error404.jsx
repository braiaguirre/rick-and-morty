import styles from './Error404.module.css';
import {useNavigate} from 'react-router-dom';

export default function Error404() {
    const navigate = useNavigate();

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