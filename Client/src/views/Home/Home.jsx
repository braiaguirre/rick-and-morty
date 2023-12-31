// STYLES
import styles from './Home.module.css';

// COMPONENTS
import Cards from '../../components/Cards/Cards.jsx';

// DEPENDENCIES
import rand from '../../utils/rand';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {createPopup, getCharacter} from '../../redux/actions/actions';

function App() {
   document.title = 'Rick and Morty > Home'

   // HOOKS
   const dispatch= useDispatch();

   // STATES
   const allCharacters = useSelector(state => state.allCharacters);

   // HANDLERS
   const advancedSearchHandler = () => dispatch(createPopup('ADVANCED_SEARCH'));
   const randomHandler = () => dispatch(getCharacter(rand()));

   return (
      <>
         <div className={styles.home}>
                {allCharacters.length === 0 &&
                    <div className={styles.helper}>
                        <div className={styles.title}>
                            <span className={styles.title2}>WHY DON'T YOU</span>
                            <span className={styles.title1}>ADD SOME CHARACTERS?</span>
                            {/* <span className={styles.icon}></span> */}
                        </div>
                        <div>
                            <button onClick={randomHandler}>Random</button>
                            <button onClick={advancedSearchHandler}>Search</button>
                        </div>
                    </div>}
                {allCharacters.length > 0 &&
                    <Cards 
                        characters={allCharacters} />}
            </div>
         
      </>
   );
}

export default App;