// STYLES
import styles from './CustomCharacters.module.css';

// COMPONENTS
import Cards from '../../components/Cards/Cards.jsx';

// DEPENDENCIES
import {useDispatch, useSelector} from 'react-redux';

function CustomCharacters() { // TODO: ADD FILTERS
    document.title = 'Rick and Morty > Custom Characters'
    
    const dispatch = useDispatch();
    const customCharacters = useSelector(state => state.customCharacters);

    return (
        <>
            <div className={styles.customCharacters}>
                {customCharacters.length === 0 &&
                    <div className={styles.helper}>
                        <span>NO CUSTOM CHARACTERS YET!</span>
                        <span className={styles.icon}></span>
                    </div>}
                {customCharacters.length > 0 &&
                    <div className={styles.cards}>
                        <Cards characters={customCharacters} />
                    </div>}
            </div>
        </>
    )
}

export default CustomCharacters;