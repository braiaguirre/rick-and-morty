// STYLES
import styles from './Nav.module.css'

// COMPONENTS
import SearchBar from '../SearchBar/SearchBar.jsx';

// DEPENDENCIES
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';

// ACTIONS
import {getCharacter, removeCharacter, menuCollapse, removeAccess} from '../../redux/actions/actions';

function Nav() {

    // HOOKS
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    
    // STATES
    const userImage = useSelector(state => state.user.image);
    const collapsed = useSelector(state => state.menuCollapse);

    // HANDLERS
    const logOut = () => dispatch(sendAlert('Wait!', 'Are you sure you want to leave?', 'yesno', () => dispatch(removeAccess())));
    const navigateHandler = (e) => navigate(`/${e.target.id}`)
    const menuCollapseHandler = () => dispatch(menuCollapse());
    const addHandler = (id) => dispatch(getCharacter(id));

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
                <SearchBar />
                
                <div className={styles.profile}>
                    <img src={userImage} />
                </div>
            </div>
        </div>
    )
}

export default Nav;