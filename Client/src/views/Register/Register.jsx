// STYLES
import styles from './Register.module.css';

// DEPENDENCIES
import rand from '../../utils/rand';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// ACTIONS
import {getImage, clearImage, signUp, sendAlert} from '../../redux/actions/actions';

// ASSETS + UTILS
import validation from '../../utils/registerValidation.js';

export default function Login({logIn}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const image = useSelector(state => state.image);

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({name: '', username: '', email: '', password: '', confirmPassword: '', image: ''})
    const [errors, setErrors] = useState({name: 'Enter a valid name.', username: 'Enter a valid username', email: 'Enter a valid email.', password: 'Enter a valid password.', confirmPassword: 'Passwords does not match.'});

    // UTILS
    const loader = (time) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, time);
    }

    function changeHandler(e) {        
        setUserData({...userData, [e.target.name]: e.target.value})
        setErrors(validation({...userData, [e.target.name]: e.target.value}));
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!errors.email && !errors.password) signUp(userData);
        else dispatch(sendAlert('Error', 'Incorrect email or password.', 'accept'));
    }
    
    const cancelHandler = (e) => {
        e.preventDefault();
        navigate('/');
    }

    // IMAGE
    function imageHandler(e) {
        e.preventDefault();
        let id = rand();
        dispatch(getImage(id));
        setUserData({...userData, image: image});
        loader(1000);
    }

    // LOAD DATA
    useEffect(() => {
        let id = rand();
        dispatch(getImage(id));
        loader(1000);
        return () => {
            dispatch(clearImage());
        };
    }, []);

    return (
        <div className={styles.register}>
            <h2>Sign Up</h2>
            <form onSubmit={submitHandler}>
                <div className={styles.formContainer}>
                    <div className={styles.col}>
                        <div className={styles.formDiv}>
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
                        </div><div className={styles.formDiv}>
                            <input 
                                name="username" 
                                onChange={changeHandler} 
                                value={userData.username}
                                placeholder="Username"/> 
                            <span 
                                className="material-symbols-outlined" 
                                width="20px">
                                {errors.username !== '' ? 'close' : 'done'}
                            </span>
                        </div>
                        <div className={styles.formDiv}>
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
                        <div className={styles.formDiv}>
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
                        <div className={styles.formDiv}>
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
                    </div>
                    <div className={`${styles.col} ${styles.imageCol}`}>
                        <div className={styles.formDiv}>
                            <button onClick={imageHandler}>Random image</button>
                            {loading ? 
                                <div className={styles.spinner}></div>
                            :
                                <img alt="Custom character image" src={image} />}
                        </div>
                    </div>
                </div>
                <button onClick={cancelHandler}>Cancel</button>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}