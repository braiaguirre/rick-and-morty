// STYLES
import styles from './SearchBar.module.css';

// DEPENDENCIES
import rand from '../../utils/rand';
import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {removeCharacter, createPopup, getCharacter, sendAlert} from '../../redux/actions/actions';

function SearchBar() {

   // HOOKS
   const dispatch= useDispatch();
   const inputRef = useRef(null);
   
   // STATES
   const menuCollapse = useSelector(state => state.menuCollapse);
   const [idInput, setIdInput] = useState('');

   // HANDLERS
   const createCharacterHandler = () => dispatch(createPopup('CREATE_CHARACTER'));
   const changeHandler = (e) => setIdInput(e.target.value);
   const randomHandler = () => dispatch(getCharacter(rand()));
   const clearHandler = () => dispatch(sendAlert('Wait!', 'Are you sure you want to remove all characters?', 'yesno', () => dispatch(removeCharacter(-1))));
   const advancedSearchHandler = () => dispatch(createPopup('ADVANCED_SEARCH'));
   const quickAddHandler = () => {
      if (!idInput) dispatch(sendAlert('Error', 'Have you entered an ID?', 'accept'));
      else {
         dispatch(getCharacter(idInput));
         setIdInput('');
         inputRef.current.focus();
      }
   }

   return (
      <>
         <div className={styles.search}>
            <input 
               type='search' 
               ref={inputRef}
               value={idInput} 
               onChange={changeHandler} 
               placeholder="ID" />
            <button onClick={quickAddHandler}>
               {menuCollapse ? <span className="material-symbols-outlined">add</span> : 'Quick Add'}
            </button>
            <button onClick={randomHandler}>
               {menuCollapse ? <span className="material-symbols-outlined">shuffle</span> : 'Random'}
            </button>
            <button onClick={advancedSearchHandler}>
               {menuCollapse ? <span className="material-symbols-outlined">search</span> : 'Search'}
            </button>
            <button onClick={createCharacterHandler}>
               {menuCollapse ? <span className="material-symbols-outlined">edit</span> : 'Create'}
            </button>
            <button onClick={clearHandler}>
               {menuCollapse ? <span className="material-symbols-outlined">backspace</span> : 'Clear'}
            </button>
         </div>
      </>
   );
}

export default SearchBar;