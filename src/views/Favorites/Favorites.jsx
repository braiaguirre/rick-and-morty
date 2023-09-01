import styles from './Favorites.module.css';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterCards, orderCards} from '../../redux/actions/actions.js';
import Cards from '../../components/Cards/Cards.jsx';

export default function Favorites() {
    const [orderFilter, setOrderFilter] = useState('N'); // local state -> order filter
    const [genderFilter, setGenderFilter] = useState('All') // local state - gender filter
    const filteredFavs = useSelector(state => state.filteredFavs);
    const dispatch = useDispatch();

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
                    {/* <span className={`material-symbols-outlined ${styles.arrow}`}>switch_access_shortcut</span> */}
                </div>}
                {filteredFavs.length > 0 &&
                    <div className={styles.cards}>
                    <Cards characters={filteredFavs} />
                    {/* {(filteredFavs).map(character=> <Card character={character} key={character.id}/>)} */}
                </div>}
            </div>
        </>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         filteredFavs: state.filteredFavs,
//     }
// }

// export default connect(mapStateToProps, null)(Favorites);
