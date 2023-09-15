// STYLES
import styles from './Favorites.module.css';

// DEPENDENCIES
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// COMPONENTS
import Cards from '../../components/Cards/Cards';
import Filters from '../../components/Filters/Filters';

function Favorites({closeHandler, editCharacterHandler}) {
    document.title = 'Rick and Morty > Favorites'

    // HOOKS
    const navigate = useNavigate();

    // STATES
    const filteredFavs = useSelector(state => state.filteredFavs);

    // HANDLERS
    const navigateHandler = () => navigate('/home');

    return (
        <>
            <Filters />
            <div className={styles.favorites}>
                {filteredFavs.length === 0 &&
                    <div className={styles.helper}>
                        <div>
                            <span>NO FAVORITES YET</span>
                            <span className={styles.icon}></span>
                        </div>
                        <div>
                            <button onClick={navigateHandler}>Home</button>
                        </div>
                    </div>}
                {filteredFavs.length > 0 &&
                    <div className={styles.cards}>
                        <Cards 
                            characters={filteredFavs} 
                            closeHandler={closeHandler}
                            editCharacterHandler={editCharacterHandler} />
                    </div>}
            </div>
        </>
    )
}

export default Favorites;