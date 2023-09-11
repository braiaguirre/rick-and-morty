// COMPONENTS
import Cards from '../../components/Cards/Cards.jsx';

function App({characters, closeHandler}) {
   document.title = 'Rick and Morty > Home'

   return (
      <>
         <Cards characters={characters} closeHandler={closeHandler} />
      </>
   );
}

export default App;