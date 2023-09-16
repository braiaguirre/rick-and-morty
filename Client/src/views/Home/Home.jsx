// STYLES
import styles from './Home.module.css';

// COMPONENTS
import Cards from '../../components/Cards/Cards.jsx';

// DEPENDENCIES
import rand from '../../utils/rand';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// ACTIONS
import {getCharacter} from '../../redux/actions/actions';

function App({closeHandler, advancedSearchHandler, editCharacterHandler}) {
   document.title = 'Rick and Morty > Home'

   // HOOKS
   const navigate = useNavigate();

   // STATES
   const allCharacters = useSelector(state => state.allCharacters);

   // HANDLERS
   const randomHandler = () => {
      let id = rand();
      dispatch(getCharacter(id));
   }

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
                        characters={allCharacters} 
                        closeHandler={closeHandler}
                        editCharacterHandler={editCharacterHandler} />}
            </div>
         
      </>
   );
}

export default App;