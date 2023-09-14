// STYLES
import styles from './Register.module.css';

// DEPENDENCIES
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// ACTIONS
import {sendAlert} from '../../redux/actions/actions';

// ASSETS + UTILS
import validation from '../../utils/registerValidation.js';

export default function Login({logIn}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({name: '', email: '', password: '', confirmPassword: ''})
    const [errors, setErrors] = useState({name: 'Enter a valid name.', email: 'Enter a valid email.', password: 'Enter a valid password.', confirmPassword: 'Passwords does not match.'});

    function changeHandler(e) {        
        setUserData({...userData, [e.target.name]: e.target.value})
        setErrors(validation({...userData, [e.target.name]: e.target.value}));
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!errors.email && !errors.password) logIn(userData);
        else dispatch(sendAlert('Error', 'Incorrect email or password.', 'accept'));
    }
    
    const cancelHandler = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className={styles.register}>
            <h2>Sign Up</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input 
                        name="name" 
                        onChange={changeHandler} 
                        value={userData.name}
                        placeholder="Name"/> 
                    <span 
                        className="material-symbols-outlined" 
                        width="20px">
                        {errors.name !== '' ? 'close' : 'done'}
                    </span>
                </div>
                <div>
                    <input 
                        name="email" 
                        value={userData.email}
                        onChange={changeHandler} 
                        placeholder="Email"/> 
                    <span 
                        className="material-symbols-outlined" 
                        width="20px">
                        {errors.email !== '' ? 'close' : 'done'}
                    </span>
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        value={userData.password}
                        onChange={changeHandler} 
                        placeholder="Password" />
                    <span 
                        className="material-symbols-outlined" 
                        width="20px">
                        {errors.password !== '' ? 'close' : 'done'}
                    </span>
                </div>
                <div>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={userData.confirmPassword}
                        onChange={changeHandler} 
                        placeholder="Confirm Password" />
                    <span 
                        className="material-symbols-outlined" 
                        width="20px">
                        {errors.confirmPassword !== '' ? 'close' : 'done'}
                    </span>
                </div>
                <button onClick={cancelHandler}>Cancel</button>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}