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

    const locations = useSelector(state => state.locations);
    const image = useSelector(state => state.image);
    const [loading, setLoading] = useState(false);
    const [newCharacter, setNewCharacter] = useState({id: character.id, name: character.name, gender: character.gender, species: character.species, origin: character.origin, image: character.image, status: character.status});
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
        setNewCharacter({...newCharacter, image: image});
        loader(1000);
    }

    // SUBMIT FORM
    function submitHandler(e) {
        e.preventDefault();
        for (let error in errors) {
            if (error) dispatch(sendAlert('Wait!', 'All fields are required to edit a character.', 'accept'));
            return;
        }

        dispatch(editCharacter(character, newCharacter));
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
        dispatch(getImage(newCharacter.id));
        loader(1000);
        return () => {
            dispatch(clearLocations());
            dispatch(clearImage());
        };
    }, []);

    return (
        <div className={styles.editCharacter}>
            <h2>Edit Character</h2>
            <p>Change the character data to convert it into a custom character.</p>
            <form onSubmit={submitHandler}>
                <div className={styles.formContainer}>
                    {/* FIRST COLUMN */}
                    <div className={`${styles.col} ${styles.dataCol}`}>

                        {/* NAME */}
                        <div className={styles.formDiv}>
                            <input name="name" onChange={changeHandler} value={newCharacter.name} placeholder="Name" /> 
                            <span className="material-symbols-outlined" width="20px">{errors.name ? 'close' : 'done'}</span>
                        </div>

                        {/* GENDER */}
                        <div className={styles.formDiv}>
                            <select name="gender" onChange={changeHandler} value={newCharacter.gender}>
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
                            <select name="species" onChange={changeHandler} value={newCharacter.species}>
                                <option value="">Species</option>
                                <option value="Human">Human</option>
                                <option value="Alien">Alien</option>
                                <option value="Robot">Robot</option>
                            </select>
                            <span className="material-symbols-outlined" width="20px">{errors.species ? 'close' : 'done'}</span>
                        </div>

                        {/* ORIGIN */}
                        <div className={styles.formDiv}>
                            <select name="origin" onChange={changeHandler} value={newCharacter.origin.name}>
                                <option value="">Origin</option>
                                {locations.map(location => 
                                    <option value={location.name} key={location.id}>{location.name}</option>
                                )}
                            </select>
                            <span className="material-symbols-outlined" width="20px">{errors.origin ? 'close' : 'done'}</span>
                        </div>
                        
                        {/* STATUS */}
                        <div className={styles.formDiv}>
                            <select name="status" onChange={changeHandler} value={newCharacter.status}>
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

                <button onClick={closeHandler}>Close</button>
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}

export default EditCharacter;