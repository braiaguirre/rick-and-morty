// STYLES
import styles from './Cards.module.css';

// COMPONENTS
import Card from '../Card/Card.jsx';

function Cards({characters}) {
   return (
      <>
         <div className={styles.cards}>
            {characters.map(character => 
               <Card 
                  character={character} 
                  key={character.id} />
            )}
         </div>
      </>
   );
}

export default Cards;