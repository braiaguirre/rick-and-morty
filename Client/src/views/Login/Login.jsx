// STYLES
import styles from './Login.module.css';

// DEPENDENCIES
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// ACTIONS
import {getAccess, sendAlert} from '../../redux/actions/actions';

// ASSETS + UTILS
import logo from '../../assets/logo.png';
import validation from '../../utils/loginValidation.js';

export default function Login() {
    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // STATES
    const [userData, setUserData] = useState({emailUsername: '', password: ''})
    const [errors, setErrors] = useState({emailUsername: true, password: true});

    // HANDLERS
    const logIn = ({emailUsername, password}) => dispatch(getAccess(emailUsername, password));

    const changeHandler = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
        setErrors(validation(userData));
    }

    const submitHandler = (e) =>  {
        e.preventDefault();
        if (!errors.emailUsername && !errors.password) logIn(userData);
        else dispatch(sendAlert('Error', 'Incorrect email or password.', 'accept'));
    }

    const signUpHandler = (e) => {
        e.preventDefault();
        navigate('/register');
    }

    return (
        <div className={styles.login}>
            <img src={logo} />
            <form onSubmit={submitHandler}>
                <div>
                    <input 
                        name="emailUsername" 
                        value={userData.emailUsername} 
                        onChange={changeHandler} 
                        placeholder="Username or email"/> 
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        value={userData.password} 
                        onChange={changeHandler} 
                        placeholder="Password" />
                </div>
                {/* <div>
                    <label>
                        <input type="checkbox" />Remember me next time
                    </label>
                </div> */}
                <button onClick={signUpHandler}>Sign Up</button>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}