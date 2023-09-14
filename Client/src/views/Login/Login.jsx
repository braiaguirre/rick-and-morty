// STYLES
import styles from './Login.module.css';

// DEPENDENCIES
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// ACTIONS
import {sendAlert} from '../../redux/actions/actions';

// ASSETS + UTILS
import logo from '../../assets/logo.png';
import validation from '../../utils/loginValidation.js';

export default function Login({logIn}) {
    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // STATES
    const [userData, setUserData] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({email: true, password: true});

    const changeHandler = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
        setErrors(validation(userData));
    }

    const submitHandler = (e) =>  {
        e.preventDefault();
        if (!errors.email && !errors.password) logIn(userData);
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
                        name="email" 
                        value={userData.email} 
                        onChange={changeHandler} 
                        placeholder="Email"/> 
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        value={userData.password} 
                        onChange={changeHandler} 
                        placeholder="Password" />
                </div>
                <button onClick={signUpHandler}>Sign Up</button>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}