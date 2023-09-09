// COMPONENTS
import Cards from '../../components/Cards/Cards.jsx';

function App({characters, onClose}) {
   document.title = 'Rick and Morty > Home'

   return (
      <>
         <Cards characters={characters} onClose={onClose} />
      </>
   );
}

export default App;