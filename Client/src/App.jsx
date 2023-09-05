// STYLES
document.title = 'Rick And Morty';
import styles from './App.module.css';

// VIEWS
import Home from './views/Home/Home.jsx'
import Detail from './views/Detail/Detail.jsx';
import Login from './views/Login/Login.jsx';
import Favorites from './views/Favorites/Favorites.jsx';
import Error404 from './views/Error404/Error404.jsx';
import About from './views/About/About.jsx';

// COMPONENTS
import Nav from './components/Nav/Nav.jsx'

// DEPENDENCIES
import {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getCharacter, removeCharacter, clearError} from './redux/actions/actions.js';

export default function App() {
   const [mem, setMem] = useState([]);
   const [access, setAccess] = useState(false);
   const characters = useSelector(state => state.allCharacters);
   const error = useSelector(state => state.error);
   const EMAIL = 'prueba@gmail.com';
   const PASSWORD = 'prueba12';
   const navigate = useNavigate();
   const dispatch = useDispatch();

   // ACCESS - LOGIN - LOGOUT
   function logIn({email, password}) {
      if (email.toLowerCase() === EMAIL && password === PASSWORD) {
         setAccess(true);
         navigate(`/home`);
      }
   }
   
   function logOut({email, password}) {
      setAccess(false);
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   useEffect(() => {
      if (error !== '') alert(error);
   }, [error])
   
   // ADD CHARACTER
   function onSearch(id) {
      dispatch(clearError);
      dispatch(getCharacter(id));
      setMem(mem => [...mem, Number(id)]);
   }

   // REMOVE CHARACTER
   function onClose(id = -1) {
      console.log(mem);
      if (id === -1) {
         dispatch(removeCharacter(id));
         setMem([]);
      } else {
         dispatch(removeCharacter(id));
         setMem(mem.filter(character => character.id !== Number(id)));
      }
      console.log(mem);
   }

   // APP
   return (
      <>
         {access && <div className={styles.navbar}>
            <Nav onSearch={onSearch} logOut={logOut} onClose={onClose} />
         </div>}
         <>
            {!access && <div className={styles.login}>
               <Routes>
                  <Route path='/' element={<Login logIn={logIn}/>} />
               </Routes>
            </div>}
            {access && <div className={styles.app}>
               <Routes>
                  <Route path='/home' element={<Home characters={characters} onClose={onClose} />} />
                  <Route path='/favorites' element={<Favorites />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/detail/:id' element={<Detail />} />
                  <Route path='*' element={<Error404 />} />
               </Routes>
            </div>}
         </>
      </>
   );
}