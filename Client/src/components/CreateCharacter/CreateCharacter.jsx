// STYLES
import styles from './CreateCharacter.module.css';

// DEPENDENCIES
import rand from '../../utils/rand';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {createCharacter, sendAlert, getLocations, clearLocations, getImage, clearImage} from '../../redux/actions/actions.js';

// ASSETS + UTILS
import validation from '../../utils/createCharacterValidation.js';

function CreateCharacter({closeCreateCharacter}) {
    const dispatch = useDispatch();

    const locations = useSelector(state => state.locations);
    const image = useSelector(state => state.image);
    const [loading, setLoading] = useState(false);
    const [character, setCharacter] = useState({name: '', gender: '', species: '', origin: {name: ''}, status: ''});
    const [errors, setErrors] = useState({name: true, gender: true, species: true, origin: true, status: true});

    // UTILS
    const loader = (time) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, time);
    }

    // CHANGE HANDLER (LOCAL STATE)
    function changeHandler(e) {      
        if (e.target.name === 'origin') {
            setCharacter({
                ...character, origin: {name: e.target.value}});
            setErrors(validation({
                ...character, origin: {name: e.target.value}}));
        } else {
            setCharacter({
                ...character, [e.target.name]: e.target.value})
            setErrors(validation({
                ...character, [e.target.name]: e.target.value}));
        }
    }

    // IMAGE
    function imageHandler(e) {
        e.preventDefault();
        let id = rand();
        dispatch(getImage(id));
        loader(1000);
    }

    // SUBMIT FORM
    function submitHandler(e) {
        e.preventDefault();
        for (let error in errors) {
            if (error) dispatch(sendAlert('Wait!', 'All fields are required to create a new character.', 'accept'));
            return;
        }
        dispatch(createCharacter({...character, image: image}));
        closeCreateCharacter();
    }

    // CLOSE POPUP
    function closeHandler(e) {
        e.preventDefault();
        closeCreateCharacter();
    }

    // LOAD DATA
    useEffect(() => {
        let id = rand();
        dispatch(getLocations());
        dispatch(getImage(id));
        loader(1000);
        return () => {
            dispatch(clearLocations());
            dispatch(clearImage());
        };
    }, []);

    return (
        <div className={styles.createCharacter}>
            <h2>Create Character</h2>
            <p>You can add your own personalized character.</p>
            <form onSubmit={submitHandler}>
                <div className={styles.formContainer}>
                    {/* FIRST COLUMN */}
                    <div className={`${styles.col} ${styles.dataCol}`}>

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
                                <option value="Robot">Robot</option>
                            </select>
                            <span className="material-symbols-outlined" width="20px">{errors.species ? 'close' : 'done'}</span>
                        </div>

                        {/* ORIGIN */}
                        <div className={styles.formDiv}>
                            <select name="origin" onChange={changeHandler}>
                                <option value="">Origin</option>
                                {locations.map(location => 
                                    <option value={location.name} key={location.id}>{location.name}</option>
                                )}
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
                    </div>
                    
                    {/* SECOND COLUMN */}
                    <div className={`${styles.col} ${styles.imageCol}`}>
                        {/* IMAAGE */}
                        <div className={styles.formDiv}>
                            <button onClick={imageHandler}>Random image</button>
                            {loading ? 
                                <div className={styles.spinner}></div>
                            :
                                <img alt="Custom character image" src={image} />}
                        </div>
                    </div>
                </div>

                    <button type="submit">Create</button>
                    <button onClick={closeHandler}>Close</button>
            </form>
        </div>
    )
}

export default CreateCharacter;