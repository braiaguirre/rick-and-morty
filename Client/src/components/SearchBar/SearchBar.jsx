// STYLES
import styles from './SearchBar.module.css';

// COMPONENTS
import CreateCharacter from '../CreateCharacter/CreateCharacter';

// DEPENDENCIES
import {useRef, useState} from 'react';

function SearchBar({onSearch, onClose}) {
   const inputRef = useRef(null);

   const [inputValue, setInputValue] = useState('');
   const [createPopup, setCreatePopup] = useState(false);
   
   // SEARCH FROM API
   
   let changeHandler = (e) => setInputValue(e.target.value);
   
   let rand = () => (Math.random() * 826).toFixed();

   let clickHandler = () => {
      onSearch(inputValue);
      setInputValue('');
      inputRef.current.focus();
   }

   // CREATE CHARACTER
   const createCharacterHandler = () => setCreatePopup(true);

   return (
      <>
         {/* CREATE CHARACTER POPUP */}
         {createPopup && 
            <div className={styles.createCharacterContainer}>
               <CreateCharacter />
            </div>}

         {/* MAIN SEARCH BAR */}
         <div className={styles.search}>
            <input type='search' ref={inputRef} value={inputValue} onChange={changeHandler} placeholder="ID" />
            <button onClick={clickHandler}>Add</button>
            <button onClick={() => onSearch(rand())}>Random</button>
            <button onClick={createCharacterHandler}>Create</button>
            <button onClick={() => onClose(-1)}>Clear</button>
         </div>
      </>
   );
}

export default SearchBar;