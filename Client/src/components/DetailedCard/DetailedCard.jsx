// STYLES
import styles from './DetailedCard.module.css'

// DEPENDENCIES
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

// ACTIONS
import {sendAlert, createPopup, addFav, removeFav} from '../../redux/actions/actions.js';

function DetailedCard({character}) {

    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // STATES
    const [loading, setLoading] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const filteredFavs = useSelector(state => state.filteredFavs)

    // HANDLERS
    const favoriteHandler = () => {
        if (isFav) {
            setIsFav(false);
            dispatch(removeFav(character.id));
        } else {
            setIsFav(true);
            dispatch(addFav(character));
    }  }

    const editHandler = () => {
        if (character.id < 825) dispatch(sendAlert('Wait!', 'Editing this character will convert it to a custom character, are you sure?', 'yesno', () => dispatch(createPopup('EDIT_CHARACTER', character))));
        else dispatch(createPopup('EDIT_CHARACTER', character));
    }

    const closeHandler = () => {
        navigate('/home');
    }

    // LOAD DATA
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
                                <span className='material-symbols-outlined'>
                                    favorite
                                </span>
                            </button> 
                        : 
                            <button onClick={favoriteHandler}>
                                <span className={`material-symbols-outlined ${styles.isFav}`}>
                                    favorite
                                </span>
                            </button>}
                        <button onClick={editHandler}>
                            <span className='material-symbols-outlined'>edit_document</span>
                        </button>
                        <button onClick={closeHandler}>
                            <span className='material-symbols-outlined'>arrow_back</span>
                        </button>
                    </div>

                    {/* CHARACTER INFO */}
                    <h2>{character.name}</h2>
                    <h3><b>Status:</b> {character.status}</h3>
                    <h3><b>Species:</b> {character.species}</h3>
                    <h3><b>Gender:</b> {character.gender}</h3>
                    <h3><b>Episodes:</b> {character.episode?.length}</h3>
                    <h3><b>Origin:</b> {character.origin?.name}</h3>
                    <img src={character.image} alt='imagen'/>
                </>
            }
        </div>
    );
}

export default DetailedCard;