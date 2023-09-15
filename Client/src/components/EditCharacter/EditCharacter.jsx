// STYLES
import styles from './EditCharacter.module.css';

// DEPENDENCIES
import rand from '../../utils/rand';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {editCharacter, sendAlert, getLocations, clearLocations, getImage, clearImage} from '../../redux/actions/actions.js';

// ASSETS + UTILS
import validation from '../../utils/createCharacterValidation.js';

function EditCharacter({character, closeEditCharacter}) {
    const dispatch = useDispatch();
    console.log(character);

    const locations = useSelector(state => state.locations);
    const image = useSelector(state => state.image);
    const [loading, setLoading] = useState(false);
    const [newCharacter, setNewCharacter] = useState({name: character.name, gender: character.gender, species: character.species, origin: character.origin, status: character.status});
    const [errors, setErrors] = useState({name: false, gender: false, species: false, origin: false, status: false});

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
            setNewCharacter({
                ...newCharacter, origin: {name: e.target.value}});
            setErrors(validation({
                ...newCharacter, origin: {name: e.target.value}}));
        } else {
            setNewCharacter({
                ...newCharacter, [e.target.name]: e.target.value})
            setErrors(validation({
                ...newCharacter, [e.target.name]: e.target.value}));
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
            if (error) dispatch(sendAlert('Wait!', 'All fields are required to create a new newCharacter.', 'accept'));
            return;
        }
        dispatch(editCharacter({...newCharacter, image: image}));
        closeEditCharacter();
    }

    // CLOSE POPUP
    function closeHandler(e) {
        e.preventDefault();
        closeEditCharacter();
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
        <div className={styles.editCharacter}>
            <h2>Edit Character</h2>
            <p>Editing this character will convert it to a custom newCharacter.</p>
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
                                <img alt="Custom newCharacter image" src={image} />}
                        </div>
                    </div>
                </div>

                <button type="submit">Create</button>
                <button onClick={closeHandler}>Close</button>
            </form>
        </div>
    )
}

export default EditCharacter;