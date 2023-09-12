// STYLES
import styles from './App.module.css';

// DEPENDENCIES
import {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {getCharacter, removeCharacter, getAccess, removeAccess, sendAlert} from './redux/actions/actions.js';

// VIEWS
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail';
import Login from './views/Login/Login';
import Favorites from './views/Favorites/Favorites';
import CustomCharacters from './views/CustomCharacters/CustomCharacters';
import Error404 from './views/Error404/Error404';
import About from './views/About/About';

// COMPONENTS
import Nav from './components/Nav/Nav';
import Alert from './components/Alert/Alert';
import CreateCharacter from './components/CreateCharacter/CreateCharacter';

function App() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [createCharacter, setCreateCharacter] = useState(false);
   const access = useSelector(state => state.access);
   const characters = useSelector(state => state.allCharacters);
   const error = useSelector(state => state.error);
   const alert = useSelector(state => state.alert);

   // ACCESS HANDLERS
   const logIn = ({email, password}) => dispatch(getAccess(email, password));
   const logOut = () => dispatch(sendAlert('Wait!', 'Are you sure you want to leave?', 'yesno', () => dispatch(removeAccess())));
   useEffect(() => {
      access ? navigate('/home') : navigate('/')
   }, [access]);
   
   // CHARACTERS HANDLERS
   const addHandler = (id) => dispatch(getCharacter(id));
   const closeHandler = (id = -1) => {
      if (id === -1) dispatch(sendAlert('Wait!', 'Are you sure you want to remove all characters?', 'yesno', () => dispatch(removeCharacter(id))));
      else if (id >= 826) dispatch(sendAlert('Wait!', 'This is a custom character, are you sure you want to remove it?', 'yesno', () => dispatch(removeCharacter(id))));
      else dispatch(removeCharacter(id))
   };
   
   // CREATE CHARACTER
   const createCharacterHandler = () => setCreateCharacter(true);
   const closeCreateCharacter = () => setCreateCharacter(false);

   return (
      <>
         {/* CREATE CHARACTER POPUP */}
         {createCharacter && 
               <div className={styles.createCharacterContainer}>
                  <CreateCharacter
                     closeCreateCharacter={closeCreateCharacter} />
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
                  addHandler={addHandler} 
                  logOut={logOut} 
                  closeHandler={closeHandler} 
                  createCharacterHandler={createCharacterHandler} />
            </div>}
         <>
            {/* LOGIN ROUTE */}
            {!access && 
               <div className={styles.login}>
                  <Routes>
                     <Route path='/' element={<Login logIn={logIn} />} />
                  </Routes>
               </div>}

            {/* MAIN APP ROUTES */}
            {access && 
               <div className={styles.app}>
                  <Routes>
                     <Route path='/home' element={<Home characters={characters} closeHandler={closeHandler} />} />
                     <Route path='/favorites' element={<Favorites />} />
                     <Route path='/custom' element={<CustomCharacters />} />
                     <Route path='/about' element={<About />} />
                     <Route path='/detail/:id' element={<Detail />}  />
                     <Route path='*' element={<Error404 />} />
                  </Routes>
               </div>}
         </>
      </>
   );
}

export default App;