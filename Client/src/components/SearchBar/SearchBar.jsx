// STYLES
import styles from './SearchBar.module.css';

// DEPENDENCIES
import rand from '../../utils/rand';
import {useRef, useState} from 'react';

function SearchBar({addHandler, closeHandler, createCharacterHandler, advancedSearchHandler}) {
   const inputRef = useRef(null);

   const [inputValue, setInputValue] = useState('');
   
   // SEARCH FROM API
   let changeHandler = (e) => {
      setInputValue(e.target.value);
   }
   
   let clickHandler = () => {
      addHandler(inputValue);
      setInputValue('');
      inputRef.current.focus();
   }

   return (
      <>
         <div className={styles.search}>
            <input type='search' ref={inputRef} value={inputValue} onChange={changeHandler} placeholder="ID" />
            <button onClick={clickHandler}>Quick Add</button>
            <button onClick={() => addHandler(rand())}>Random</button>
            <button onClick={advancedSearchHandler}>Search</button>
            <button onClick={createCharacterHandler}>Create</button>
            <button onClick={() => closeHandler(-1)}>Clear</button>
         </div>
      </>
   );
}

export default SearchBar;