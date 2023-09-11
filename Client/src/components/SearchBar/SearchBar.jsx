// STYLES
import styles from './SearchBar.module.css';

// COMPONENTS

// DEPENDENCIES
import {useRef, useState} from 'react';

function SearchBar({addHandler, closeHandler, createCharacterHandler}) {
   const inputRef = useRef(null);

   const [inputValue, setInputValue] = useState('');
   
   // SEARCH FROM API
   
   let changeHandler = (e) => setInputValue(e.target.value);
   
   let rand = () => (Math.random() * 826).toFixed();

   let clickHandler = () => {
      addHandler(inputValue);
      setInputValue('');
      inputRef.current.focus();
   }

   return (
      <>
         <div className={styles.search}>
            <input type='search' ref={inputRef} value={inputValue} onChange={changeHandler} placeholder="ID" />
            <button onClick={clickHandler}>Add</button>
            <button onClick={() => addHandler(rand())}>Random</button>
            <button onClick={createCharacterHandler}>Create</button>
            <button onClick={() => closeHandler(-1)}>Clear</button>
         </div>
      </>
   );
}

export default SearchBar;