// STYLES
import styles from './App.module.css';

// VIEWS
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail';
import Login from './views/Login/Login';
import Favorites from './views/Favorites/Favorites';
import Error404 from './views/Error404/Error404';
import About from './views/About/About';

// COMPONENTS
import Nav from './components/Nav/Nav';
import ErrorPopup from './components/ErrorPopup/ErrorPopup';

// DEPENDENCIES
import {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {getCharacter, removeCharacter, getAccess, removeAccess} from './redux/actions/actions.js';

function App() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const access = useSelector(state => state.access);
   const characters = useSelector(state => state.allCharacters);
   const error = useSelector(state => state.error);

   // ACCESS HANDLERS
   const logIn = ({email, password}) => dispatch(getAccess(email, password));
   const logOut = () => dispatch(removeAccess);

   useEffect(() => {
      access ? navigate('/home') : navigate('/')
   }, [access]);
   
   // CHARACTERS HANDLERS
   const onSearch = (id) => dispatch(getCharacter(id));
   const onClose = (id = -1) => dispatch(removeCharacter(id));
   
   return (
      <>
         {/* ERROR POPUP */}
         {error !== '' && 
            <div className={styles.errorPopupContainer}>
               <ErrorPopup error={error.error} desc={error.desc}/>
            </div>}

         {/* ACCESS */}
         {access && 
            <div className={styles.navbar}>
               <Nav onSearch={onSearch} logOut={logOut} onClose={onClose} />
            </div>}
         <>
            {/* LOGIN ROUTE */}
            {!access && 
               <div className={styles.login}>
                  <Routes>
                     <Route path='/' element={<Login logIn={logIn}/>} />
                  </Routes>
               </div>}

            {/* MAIN APP ROUTES */}
            {access && 
               <div className={styles.app}>
                  <Routes>
                     <Route path='/home' element={<Home characters={characters} onClose={onClose} />} />
                     <Route path='/favorites' element={<Favorites />} />
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