// STYLES
import styles from './App.module.css';

// DEPENDENCIES
import {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {sendAlert} from './redux/actions/actions.js';

// VIEWS
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Favorites from './views/Favorites/Favorites';
import CustomCharacters from './views/CustomCharacters/CustomCharacters';
import Error404 from './views/Error404/Error404';
import About from './views/About/About';

// COMPONENTS
import Nav from './components/Nav/Nav';
import Alert from './components/Alert/Alert';
import CreateCharacter from './components/CreateCharacter/CreateCharacter';
import EditCharacter from './components/EditCharacter/EditCharacter';
import AdvancedSearch from './components/AdvancedSearch/AdvancedSearch';

function App() {

   // HOOKS
   const navigate = useNavigate();
   const dispatch = useDispatch();

   // STATES
   const [createCharacter, setCreateCharacter] = useState(false);
   const [editCharacter, setEditCharacter] = useState({character: {}, open: false});
   // const [advancedSearch, setAdvancedSearch] = useState(false);
   const access = useSelector(state => state.access);
   const alert = useSelector(state => state.alert);
   const popup = useSelector(state => state.popup);

   // HANDLERS
   const closeCreateCharacter = () => setCreateCharacter(false);
   const createCharacterHandler = () => setCreateCharacter(true);
   // const closeAdvancedSearch = () => setAdvancedSearch(false);
   // const advancedSearchHandler = () => setAdvancedSearch(true);
   const closeEditCharacter = () => setEditCharacter({character: {name: '', gender: '', species: '', origin: '', status: ''}, open: false});
   const editCharacterHandler = (character) => {
      if (character.id < 825) {
         dispatch(sendAlert('Wait!', 'Editing this character will convert it to a custom character, are you sure?', 'yesno', () => setEditCharacter({character: character, open: true})));
      } else {
         setEditCharacter({character: character, open: true});
      }
   }

   useEffect(() => {
      access ? navigate('/home') : navigate('/')
   }, [access]);
   
   return (
      <>
         {/* ADVANCED SEARCH */}
         {popup.popupType === 'ADVANCED_SEARCH' && 
               <div className={styles.popupContainer}>
                  <AdvancedSearch />
               </div>}

         {/* CREATE CHARACTER POPUP */}
         {createCharacter && 
               <div className={styles.popupContainer}>
                  <CreateCharacter
                     closeCreateCharacter={closeCreateCharacter} />
               </div>}

         {/* EDIT CHARACTER POPUP */}
         {editCharacter.open && 
               <div className={styles.popupContainer}>
                  <EditCharacter
                     closeEditCharacter={closeEditCharacter}
                     character={editCharacter.character} />
               </div>}

         {/* ALERT POPUP */}
         {Object.keys(alert).length > 0 && 
            <div className={styles.popupContainer}>
               <Alert 
                  title={alert.title}
                  message={alert.message} 
                  alertType={alert.alertType}
                  action={alert.action} />
            </div>}
            
         {/* ACCESS */}
         {access && 
            <div className={styles.navbar}>
               <Nav 
                  createCharacterHandler={createCharacterHandler} />
            </div>}
         <>
            {/* LOGIN ROUTE */}
            {!access && 
               <div className={styles.login}>
                  <Routes>
                     <Route path='/' element={<Login />} />
                     <Route path='/register' element={<Register />} />
                  </Routes>
               </div>}

            {/* MAIN APP ROUTES */}
            {access && 
               <div className={styles.app}>
                  <Routes>
                     <Route path='/home' element={<Home editCharacterHandler={editCharacterHandler} />} />
                     <Route path='/favorites' element={<Favorites editCharacterHandler={editCharacterHandler} />} />
                     <Route path='/custom' element={<CustomCharacters createCharacterHandler={createCharacterHandler} editCharacterHandler={editCharacterHandler} />} />
                     <Route path='/about' element={<About />} />
                     <Route path='/detail/:id' element={<Detail editCharacterHandler={editCharacterHandler} />}  />
                     <Route path='*' element={<Error404 />} />
                  </Routes>
               </div>}
         </>
      </>
   );
}

export default App;