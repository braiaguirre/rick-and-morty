// STYLES
import styles from './CustomCharacters.module.css';

// COMPONENTS
import Cards from '../../components/Cards/Cards.jsx';

// DEPENDENCIES
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {filterCards, orderCards} from '../../redux/actions/actions.js';

function CustomCharacters() {
    document.title = 'Rick and Morty > Custom Characters'
    const dispatch = useDispatch();

    const filteredFavs = useSelector(state => state.filteredFavs);
    const [orderFilter, setOrderFilter] = useState('N'); // local state -> order filter
    const [genderFilter, setGenderFilter] = useState('All') // local state - gender filter

    // FILTERS
    const orderHandler = (e) => {
        setOrderFilter(e.target.value); // sets new local state
        dispatch(orderCards(e.target.value)); // dispatches order filter
        if (genderFilter !== 'All') dispatch(filterCards(genderFilter)); // if a gender filter is selected, dispatch gender filter
    }
    const statusHandler = (e) => {
        
    }
    const genderHandler = (e) => {
        setGenderFilter(e.target.value); // sets new local state
        dispatch(filterCards(e.target.value)); // dispatches gender filter
        if (orderFilter !== 'N') dispatch(orderCards(orderFilter)); // if an order filter is selected, dispatch order filter
    }

    return (
        <>
            <div className={styles.favorites}>
                <div className={styles.filters}>
                    <select onChange={orderHandler}>
                        <option value="N">No order</option>
                        <option value="A">Ascending</option>
                        <option value="D">Descending</option>
                    </select>
                    <select onChange={statusHandler}>
                        <option value="All">All status</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>
                    <select onChange={genderHandler}>
                        <option value="All">All genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Genderless">Genderless</option>
                        <option value="unknown">Unknown</option>
                    </select>
                    <button>Reset filters</button>
                </div>
                {filteredFavs.length === 0 &&
                    <div className={styles.helper}>
                    <span>NO FAVORITES YET!</span>
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

export default CustomCharacters;