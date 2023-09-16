// STYLES
import styles from './SearchBar.module.css';

// DEPENDENCIES
import rand from '../../utils/rand';
import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {sendAlert, createPopup} from '../../redux/actions/actions';

function SearchBar({addHandler, createCharacterHandler}) {

   // HOOKS
   const dispatch= useDispatch();
   const inputRef = useRef(null);
   
   // STATES
   const menuCollapse = useSelector(state => state.menuCollapse);
   const [inputValue, setInputValue] = useState('');

   // SEARCH FROM API
   const changeHandler = (e) => setInputValue(e.target.value);
   const randomHandler = () => addHandler(rand());
   const clearHandler = () => dispatch(sendAlert('Wait!', 'Are you sure you want to remove all characters?', 'yesno', () => dispatch(removeCharacter(-1))));
   const advancedSearchHandler = () => dispatch(createPopup('ADVANCED_SEARCH'));
   const clickHandler = () => {
      if (!inputValue) dispatch(sendAlert('Error', 'Have you entered an ID?', 'accept'));
      else {
         addHandler(inputValue);
         setInputValue('');
         inputRef.current.focus();
      }
   }

   return (
      <>
         <div className={styles.search}>
            <input 
               type='search' 
               ref={inputRef}
               value={inputValue} 
               onChange={changeHandler} 
               placeholder="ID" />
            <button onClick={clickHandler}>
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