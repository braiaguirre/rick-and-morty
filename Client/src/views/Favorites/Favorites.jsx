// STYLES
import styles from './Favorites.module.css';

// DEPENDENCIES
import {useSelector} from 'react-redux';

// COMPONENTS
import Cards from '../../components/Cards/Cards';
import Filters from '../../components/Filters/Filters';

function Favorites() {
    document.title = 'Rick and Morty > Favorites'

    const filteredFavs = useSelector(state => state.filteredFavs);

    return (
        <>
            <Filters />
            <div className={styles.favorites}>
                {filteredFavs.length === 0 &&
                    <div className={styles.helper}>
                        <span>NO FAVORITES YET</span>
                        <span className={styles.icon}></span>
                    </div>}
                {filteredFavs.length > 0 &&
                    <div className={styles.cards}>
                        <Cards 
                            characters={filteredFavs} 
                            asd='/favorites' />
                    </div>}
            </div>
        </>
    )
}

export default Favorites;