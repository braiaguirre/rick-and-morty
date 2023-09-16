// STYLES
import styles from './CustomCharacters.module.css';

// COMPONENTS
import Cards from '../../components/Cards/Cards.jsx';

// DEPENDENCIES
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {createPopup} from '../../redux/actions/actions';

function CustomCharacters() { // TODO: ADD FILTERS
    document.title = 'Rick and Morty > Custom Characters';
    
    // HOOKS
    const dispatch = useDispatch();
    
    // STATES
    const customCharacters = useSelector(state => state.customCharacters);

    // HANDLERS
    const createCharacterHandler = () => dispatch(createPopup('CREATE_CHARACTER'));

    return (
        <>
            <div className={styles.customCharacters}>
                {customCharacters.length === 0 &&
                    <div className={styles.helper}>
                        <div>
                            <span>NO CUSTOM CHARACTERS YET</span>
                            <span className={styles.icon}></span>
                        </div>
                        <div>
                            <button onClick={createCharacterHandler}>Create</button>
                        </div>
                    </div>}
                {customCharacters.length > 0 &&
                    <div className={styles.cards}>
                        <Cards 
                            characters={customCharacters} />
                    </div>}
            </div>
        </>
    )
}

export default CustomCharacters;