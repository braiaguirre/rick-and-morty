// STYLES
import styles from './Card.module.css'

// DEPENDENCIES
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// ACTIONS
import {createPopup, removeCharacter, addFav, removeFav} from '../../redux/actions/actions.js';

function Card({character, about}) {
    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // STATES
    const [loading, setLoading] = useState(false);
    const [isFav, setIsFav] = useState(false);  // TODO: PASAR A REDUX
    const filteredFavs = useSelector(state => state.filteredFavs);

    // NAVIGATE
    const navigateHandler = () => navigate(`/detail/${character.id}`);

    const closeHandler = () => {
        if (character.id >= 826) dispatch(sendAlert('Wait!', 'This is a custom character, are you sure you want to remove it?', 'yesno', () => dispatch(removeCharacter(character.id))));
        else dispatch(removeCharacter(character.id))
    };

    const editHandler = () => {
        if (character.id < 825) {
            dispatch(sendAlert('Wait!', 'Editing this character will convert it to a custom character, are you sure?', 'yesno', () => dispatch(createPopup('EDIT_CHARACTER', character))));
        } else {
            dispatch(createPopup('EDIT_CHARACTER', character));
        }
    }

    const favoriteHandler = () => {
        if (isFav) {
            setIsFav(false);
            dispatch(removeFav(character.id));
        } else {
            setIsFav(true);
            dispatch(addFav(character));
    }  }

    const aboutHandler = () => {
        const URL = 'https://github.com/braiaguirre';
        window.open(URL, '_blank', 'noreferrer');
    }

    useEffect(() => {
        filteredFavs.forEach(fav => {
            if (fav.id === character.id) setIsFav(true);
        });
    }, [filteredFavs]);

    // LOADING   // TODO: CREAR LOADING REAL
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, []);

    return (
        <div className={styles.card}>
            {loading ? 
                <div className={styles.spinner}></div>
            :
                <>
                    {/* CARD BUTTONS */}
                    <div>
                        
                        {!isFav ? 
                            <button onClick={favoriteHandler}>
                                <span className='material-symbols-outlined'>favorite</span>
                            </button> 
                        : 
                            <button onClick={favoriteHandler}>
                                <span className={`material-symbols-outlined ${styles.isFav}`}>favorite</span>
                            </button>}

                        {!about &&
                            <button onClick={editHandler}>
                                <span className='material-symbols-outlined'>edit_document</span>
                            </button>}

                        {!about && 
                            <button onClick={closeHandler}>
                                <span className='material-symbols-outlined'>close</span>
                            </button>}

                        {about && 
                            <button onClick={aboutHandler}>
                                <span className="material-symbols-outlined">open_in_new</span>
                            </button>}
                    </div>

                    {/* CHARACTER INFO */}
                    <a onClick={navigateHandler}><h2>{character.name}</h2></a>
                    <h3><b>Status:</b> {character.status}</h3>
                    <h3><b>Species:</b> {character.species}</h3>
                    <h3><b>Gender:</b> {character.gender}</h3>
                    <h3><b>Origin:</b> {character.origin?.name}</h3>
                    <img src={character.image} alt='imagen' onClick={about ? aboutHandler : navigateHandler} />
                </>
            }
        </div>
    );
}

export default Card;