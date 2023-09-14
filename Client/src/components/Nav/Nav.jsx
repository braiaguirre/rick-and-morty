// STYLES
import styles from './Nav.module.css'

// COMPONENTS
import SearchBar from '../SearchBar/SearchBar.jsx';

// DEPENDENCIES
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';

// ACTIONS
import {menuCollapse} from '../../redux/actions/actions';

function Nav({addHandler, logOut, closeHandler, createCharacterHandler, advancedSearchHandler}) {

    // HOOKS
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    
    // STATES
    const collapsed = useSelector(state => state.menuCollapse);

    // HANDLERS
    const navigateHandler = (e) => navigate(`/${e.target.id}`)
    const menuCollapseHandler = () => dispatch(menuCollapse());

    return (
        <div className={styles.navbar}>
            <div className={styles.menu}>
                <ul>
                    <li 
                        onClick={navigateHandler} 
                        className={pathname === '/home' ? `${styles.active}` : ''} 
                        id="home" >Home</li>
                    <li 
                        onClick={navigateHandler} 
                        className={pathname === '/favorites' ? `${styles.active}` : ''} 
                        id="favorites" >Favorites</li>
                    <li 
                        onClick={navigateHandler} 
                        className={pathname === '/custom' ? `${styles.active}` : ''} 
                        id="custom">Custom</li>
                    <li 
                        onClick={navigateHandler} 
                        className={pathname === '/about' ? `${styles.active}` : ''} 
                        id="about" >About</li>
                    <li 
                        onClick={logOut}>Logout
                        <span className="material-symbols-outlined">
                            logout
                        </span>
                    </li>
                </ul>
            </div>
            <div className={styles.navRight}>
                <div className={styles.collapse}>
                    <span className="material-symbols-outlined" onClick={menuCollapseHandler}>
                        {collapsed ? 'expand_all' : 'collapse_all'}
                    </span>
                </div>
                <SearchBar 
                    addHandler={addHandler} 
                    closeHandler={closeHandler} 
                    createCharacterHandler={createCharacterHandler}
                    advancedSearchHandler={advancedSearchHandler} />
                
                <div className={styles.profile}>
                    <span className="material-symbols-outlined">
                    account_circle
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Nav;