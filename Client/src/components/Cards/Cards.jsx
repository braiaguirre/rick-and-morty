// STYLES
import styles from './Cards.module.css';

// COMPONENTS
import Card from '../Card/Card.jsx';

function Cards({characters, closeHandler, asd}) {
   return (
      <>
         
         <div className={styles.cards}>
            {characters.map(character => 
               <Card 
                  character={character} 
                  closeHandler={closeHandler} 
                  key={character.id} />
            )}
         </div>
      </>
   );
}

export default Cards;