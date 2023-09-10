// STYLES
import styles from './Nav.module.css'

// COMPONENTS
import SearchBar from '../SearchBar/SearchBar.jsx';

// DEPENDENCIES
import {useNavigate} from 'react-router-dom';

export default function Nav({onSearch, logOut, onClose, createCharacterHandler}) {
    const navigate = useNavigate();

    return (
        <div className={styles.navbar}>
            <div className={styles.menu}>
                <ul>
                    <li onClick={() => navigate('/home')}>Home</li>
                    <li onClick={() => navigate('/favorites')}>Favorites</li>
                    <li onClick={() => navigate('/custom')}>Custom</li>
                    <li onClick={() => navigate('/about')}>About</li>
                    <li onClick={logOut}>Logout</li>
                </ul>
            </div>
            <div className={styles.search}>
                <SearchBar 
                    onSearch={onSearch} 
                    onClose={onClose} 
                    createCharacterHandler={createCharacterHandler} />
            </div>
        </div>
    )
}