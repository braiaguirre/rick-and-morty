// STYLES
import styles from './AdvancedSearch.module.css';

// DEPENDENCIES
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

// ACTIONS
import {createCharacter, sendAlert} from '../../redux/actions/actions.js';

function AdvancedSearch({closeAdvancedSearch}) {
    const dispatch = useDispatch();

    // SUBMIT FORM
    function submitHandler(e) {
        e.preventDefault();
        dispatch();
        closeCreateCharacter();
    }

    function changeHandler() {

    }

    return (
        // <div className={styles.advancedSearch}>
        //     <h2>Create Character</h2>
        //     <p>You can add your own personalized character.</p>
        //     <form onSubmit={submitHandler}>
        //         <div className={styles.formContainer}>
        //             {/* FIRST COLUMN */}
        //             <div className={`${styles.col} ${styles.dataCol}`}>

        //                 {/* NAME */}
        //                 <div className={styles.formDiv}>
        //                     <input name="name" onChange={changeHandler} placeholder="Name" /> 
        //                 </div>

        //                 {/* GENDER */}
        //                 <div className={styles.formDiv}>
        //                     <select name="gender" onChange={changeHandler}>
        //                         <option value="">Gender</option>
        //                         <option value="Male">Male</option>
        //                         <option value="Female">Female</option>
        //                         <option value="Genderless">Genderless</option>
        //                         <option value="unknown">Unknown</option>
        //                     </select>
        //                 </div>

        //                 {/* SPECIES */}
        //                 <div className={styles.formDiv}>
        //                     <select name="species" onChange={changeHandler}>
        //                         <option value="">Species</option>
        //                         <option value="Human">Human</option>
        //                         <option value="Alien">Alien</option>
        //                     </select>
        //                 </div>

        //                 {/* ORIGIN */}
        //                 <div className={styles.formDiv}>
        //                     <select name="origin" onChange={changeHandler}>
        //                         <option value="">Origin</option>
        //                         {locations.map(location => 
        //                             <option value={location.name} key={location.id}>{location.name}</option>
        //                         )}
        //                     </select>
        //                 </div>
                        
        //                 {/* STATUS */}
        //                 <div className={styles.formDiv}>
        //                     <select name="status" onChange={changeHandler}>
        //                         <option value="">Status</option>
        //                         <option value="Alive">Alive</option>
        //                         <option value="Dead">Dead</option>
        //                         <option value="unknown">Unknown</option>
        //                     </select>
        //                 </div>
        //             </div>
                    
        //             {/* SECOND COLUMN */}
        //             <div className={`${styles.col} ${styles.imageCol}`}>
        //                 {/* IMAAGE */}
        //                 <div className={styles.formDiv}>
        //                     <button onClick={imageHandler}>Random image</button>
        //                         <div className={styles.spinner}></div>
        //                         {/* <img alt="Custom character image" src={character.image} /> */}
        //                 </div>
        //             </div>
        //         </div>

        //             <button type="submit">Create</button>
        //             <button onClick={closeAdvancedSearch}>Close</button>
        //     </form>
        // </div>
    null)
}

export default AdvancedSearch;