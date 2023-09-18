// STYLES
import styles from './AdvancedSearch.module.css';

// DEPENDENCIES
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ACTIONS
import {closePopup, getCharacter, getLocations, clearLocations} from '../../redux/actions/actions.js';

function AdvancedSearch() {

    // HOOKS
    const dispatch = useDispatch();

    // STATES
    const locations = useSelector(state => state.locations);
    const [filters, setFilters] = useState({name: '', gender: '', species: '', origin: {name: ''}, status: ''});

    // HANDLERS
    const closeHandler = (e) => {
        e.preventDefault();
        dispatch(closePopup());
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getCharacter(null, filters.name, filters.gender, filters.species, filters.origin.name, filters.status));
        dispatch(closePopup());
    }

    const changeHandler = (e) => {
        if (e.target.name === 'origin') setFilters({...filters, origin: {name: e.target.value}});
        else setFilters({...filters, [e.target.name]: e.target.value});
    }

    // LOAD DATA
    useEffect(() => {
        dispatch(getLocations());
        return () => {
            dispatch(clearLocations());
        };
    }, []);

    return (
        <div className={styles.advancedSearch}>
            <h2>Advanced Search</h2>
            <p>All characters matching the filters will be added to the app.</p>
            
            <form onSubmit={submitHandler}>
                <div className={styles.formContainer}>
                    {/* FIRST COLUMN */}

                        {/* NAME */}
                        <div className={styles.formDiv}>
                            <input name="name" onChange={changeHandler} placeholder="Name" /> 
                        </div>
                        
                        {/* GENDER */}
                        <div className={styles.formDiv}>
                            <select name="gender" onChange={changeHandler}>
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="genderless">Genderless</option>
                                <option value="unknown">Unknown</option>
                            </select>
                        </div>

                        {/* SPECIES */}
                        <div className={styles.formDiv}>
                            <select name="species" onChange={changeHandler}>
                                <option value="">Species</option>
                                <option value="human">Human</option>
                                <option value="alien">Alien</option>
                            </select>
                        </div>

                        {/* ORIGIN */}
                        <div className={styles.formDiv}>
                            <select name="origin" onChange={changeHandler}>
                                <option value="">Origin</option>
                                {locations.map(location => 
                                    <option value={location.name} key={location.id}>{location.name}</option>
                                )}
                            </select>
                        </div>

                        {/* STATUS */}
                        <div className={styles.formDiv}>
                            <select name="status" onChange={changeHandler}>
                                <option value="">Status</option>
                                <option value="alive">Alive</option>
                                <option value="dead">Dead</option>
                                <option value="unknown">Unknown</option>
                            </select>
                        </div>

                    </div>
                    
                    <button type="submit">Add Characters</button>
                    <button onClick={closeHandler}>Close</button>
            </form>
        </div>
    )
}

export default AdvancedSearch;