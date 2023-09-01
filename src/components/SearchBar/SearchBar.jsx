import {useRef, useState} from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({onSearch, onClose}) {
   const [inputValue, setInputValue] = useState('');
   const inputRef = useRef(null);
   let rand = () => (Math.random() * 826).toFixed();
   let changeHandler = (e) => setInputValue(e.target.value);
   let clickHandler = () => {
      onSearch(inputValue);
      setInputValue('');
      inputRef.current.focus();
   }

   return (
      <div className={styles.search}>
         <input type='search' ref={inputRef} value={inputValue} onChange={changeHandler} placeholder="ID" />
         <button onClick={clickHandler}>Add</button>
         <button onClick={() => onSearch(rand())}>Random</button>
         <button onClick={() => onClose(-1)}>Clear</button>
      </div>
   );
}