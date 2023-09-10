// STYLES
import styles from './CreateCharacter.module.css';

// DEPENDENCIES
import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

// ACTIONS
import {createCharacter} from '../../redux/actions/actions.js';

// ASSETS + UTILS
import validation from '../../utils/createCharacterValidation.js';

function CreateCharacter({closeCreateCharacter}) {
    const dispatch = useDispatch();

    const [character, setCharacter] = useState({
        name: '',
        gender: '',
        species: '',
        origin: '',
        status: ''
    })
    const [errors, setErrors] = useState({
        name: true,
        gender: true,
        species: true,
        origin: true,
        status: true
    })
    const [locations, setLocations] = useState({});

    useEffect(() => {
        setLocations(() => {
            axios.get(`http://localhost:3001/rickandmorty/location/`)
                .then(({ data }) => console.log(data))
        })
    })

    // CHANGE HANDLER (LOCAL STATE)
    function changeHandler(e) {        
        setCharacter({...character, [e.target.name]: e.target.value})
        setErrors(validation({...character, [e.target.name]: e.target.value}));
    }

    // SUBMIT FORM
    function submitHandler(e) {
        e.preventDefault();
        for (let error in errors) {
            if (error) alert('asd');
            return;
        }
        dispatch(createCharacter(character));
        closeCreateCharacter();
    }

    function closeHandler(e) {
        e.preventDefault();
        closeCreateCharacter();
    }

    return (
        <div className={styles.createCharacter}>
            <h2>Create Character</h2>
            <p>You can add your own personalized character.</p>
            <div className={styles.formContainer}>
                <form onSubmit={submitHandler}>

                    {/* NAME */}
                    <div className={styles.formDiv}>
                        <input name="name" onChange={changeHandler} placeholder="Name" /> 
                        <span className="material-symbols-outlined" width="20px">{errors.name ? 'close' : 'done'}</span>
                    </div>

                    {/* GENDER */}
                    <div className={styles.formDiv}>
                        <select name="gender" onChange={changeHandler}>
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Genderless">Genderless</option>
                            <option value="unknown">Unknown</option>
                        </select>
                        <span className="material-symbols-outlined" width="20px">{errors.gender ? 'close' : 'done'}</span>
                    </div>

                    {/* SPECIES */}
                    <div className={styles.formDiv}>
                        <select name="species" onChange={changeHandler}>
                            <option value="">Species</option>
                            <option value="Human">Human</option>
                            <option value="Alien">Alien</option>
                        </select>
                        <span className="material-symbols-outlined" width="20px">{errors.species ? 'close' : 'done'}</span>
                    </div>

                    {/* ORIGIN */}
                    {/* // TODO: MAPEAR DESDE API */}
                    <div className={styles.formDiv}>
                        
                        <select name="origin" onChange={changeHandler}>
                            <option value="">Origin</option>
                            {/* {locations.map(location => {
                                <option value={location.name}>{location.name}</option>
                            })} */}
                        </select>

                        <span className="material-symbols-outlined" width="20px">{errors.origin ? 'close' : 'done'}</span>
                    </div>
                    
                    {/* STATUS */}
                    <div className={styles.formDiv}>
                        <select name="status" onChange={changeHandler}>
                            <option value="">Status</option>
                            <option value="Alive">Alive</option>
                            <option value="Dead">Dead</option>
                            <option value="unknown">Unknown</option>
                        </select>
                        <span className="material-symbols-outlined" width="20px">{errors.status ? 'close' : 'done'}</span>
                    </div>

                    <button type="submit">Create</button>
                    <button onClick={closeHandler}>Close</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCharacter;