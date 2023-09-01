import styles from './Cards.module.css';
import Card from '../Card/Card.jsx';

export default function Cards({characters, onClose}) {
   return (
      <>
         {characters.length === 0 &&
            <div className={styles.helper}>
               <span>ADD SOME CHARACTERS!</span>
               <span className={styles.icon}></span>
               {/* <span className={`material-symbols-outlined ${styles.arrow}`}>switch_access_shortcut</span> */}
            </div>
         }
         <div className={styles.cards}>
            {characters.map(character => 
               <Card character={character} onClose={onClose} key={character.id} />
            )}
         </div>
      </>
   );
}