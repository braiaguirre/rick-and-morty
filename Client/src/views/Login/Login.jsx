// STYLES
import styles from './Login.module.css';

// DEPENDENCIES
import {useState} from 'react';
import {useDispatch} from 'react-redux';

// ACTIONS
import {sendAlert} from '../../redux/actions/actions';

// ASSETS + UTILS
import logo from '../../assets/logo.png';
import validation from '../../utils/loginValidation.js';

export default function Login({logIn}) {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({email: true, password: true});

    function changeHandler(e) {        
        setUserData({...userData, [e.target.name]: e.target.value})
        setErrors(validation(userData));
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!errors.email && !errors.password) logIn(userData);
        else dispatch(sendAlert('Error', 'Incorrect email or password.', 'accept'));
    }

    return (
        <div className={styles.login}>
            <img src={logo} />
            <form onSubmit={submitHandler}>
                <div>
                    <input name="email" value={userData.email} onChange={changeHandler} placeholder="Email"/> 
                    <span className="material-symbols-outlined" width="20px">{errors.email ? 'close' : 'done'}</span>
                </div>
                <div>
                    <input type="password" name="password" value={userData.password} onChange={changeHandler} placeholder="Password" />
                    <span className="material-symbols-outlined" width="20px">{errors.password ? 'close' : 'done'}</span>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}