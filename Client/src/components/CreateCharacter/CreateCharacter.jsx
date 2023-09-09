// STYLES
import styles from './CreateCharacter.module.css';

// DEPENDENCIES
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

// ACTIONS
import {createCharacter} from '../../redux/actions/actions.js';

// ASSETS + UTILS
import validation from '../../utils/createCharacterValidation.js';

function CreateCharacter() {
    const dispatch = useDispatch();

    const [character, setCharacter] = useState({})
    const [errors, setErrors] = useState({email: true, password: true});

    // CHANGE HANDLER (LOCAL STATE)
    function changeHandler(e) {        
        setUserData({...userData, [e.target.name]: e.target.value})
        setErrors(validation(userData));
    }

    // CLEAR ERROR HANDLER
    function submitHandler() {
        e.preventDefault();
        if (!errors.email && !errors.password) dispatch(createCharacter());
        else {
            alert('El email o la contraseña son incorrectos');
            return;
        }
        
    }
    
    return (
        <div className={styles.createCharacter}>
            <form onSubmit={submitHandler}>
                <div>
                    <input name="name" onChange={changeHandler} placeholder="Name"/> 
                    <span className="material-symbols-outlined" width="20px">{errors.name ? 'close' : 'done'}</span>
                </div>
                <div>
                    <input name="gender" onChange={changeHandler} placeholder="Gender"/> 
                    <span className="material-symbols-outlined" width="20px">{errors.gender ? 'close' : 'done'}</span>
                </div>
                <div>
                    <input name="password" onChange={changeHandler} placeholder="Password" />
                    <span className="material-symbols-outlined" width="20px">{errors.password ? 'close' : 'done'}</span>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateCharacter;