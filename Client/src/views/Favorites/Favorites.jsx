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
            <div className={styles.favorites}>
                <Filters />

                {/* CONTENT */}
                {filteredFavs.length === 0 &&
                    <div className={styles.helper}>
                    <span>NO FAVORITES YET</span>
                    <span className={styles.icon}></span>
                    </div>}
                {filteredFavs.length > 0 &&
                    <div className={styles.cards}>
                    <Cards characters={filteredFavs} />
                    </div>}
            </div>
        </>
    )
}

export default Favorites;