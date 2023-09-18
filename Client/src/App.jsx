// STYLES
import styles from './App.module.css';

// DEPENDENCIES
import {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

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
import ProfilePopup from './components/ProfilePopup/ProfilePopup';

function App() {

   // HOOKS
   const navigate = useNavigate();

   // STATES
   const access = useSelector(state => state.access);
   const alert = useSelector(state => state.alert);
   const popup = useSelector(state => state.popup);

   useEffect(() => {
      access ? navigate('/home') : navigate('/')
   }, [access]);
   
   return (
      <>
         {/* POPUPS */}
         <div className={styles.popupContainer}>
            {popup.popupType === 'ADVANCED_SEARCH' && <AdvancedSearch />}
            {popup.popupType === 'CREATE_CHARACTER' && <CreateCharacter />}
            {popup.popupType === 'EDIT_CHARACTER' && <EditCharacter />}
            {popup.popupType === 'PROFILE_POPUP' && <ProfilePopup />}
            {Object.keys(alert).length > 0 && 
               <Alert 
                  title={alert.title}
                  message={alert.message} 
                  alertType={alert.alertType}
                  action={alert.action} />}
         </div>

         {/* ACCESS */}
         {access && 
            <div className={styles.navbar}>
               <Nav />
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
                     <Route path='/home' element={<Home />} />
                     <Route path='/favorites' element={<Favorites />} />
                     <Route path='/custom' element={<CustomCharacters />} />
                     <Route path='/about' element={<About />} />
                     <Route path='/detail/:id' element={<Detail />} />
                     <Route path='*' element={<Error404 />} />
                  </Routes>
               </div>}
         </>
      </>
   );
}

export default App;