// STYLES
import styles from './Detail.module.css';

// DEPENDENCIES
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';

// ACTIONS
import {getCharacterDetail} from '../../redux/actions/actions';

function About() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();
    const character = useSelector(state => state.characterDetail);

    const navigateHandler = () => navigate('/home');
    useEffect(() => {
        dispatch(getCharacterDetail(id))
    }, []);

    return (
        <div className={styles.detail}>
            <div className={styles.card}>
               <button onClick={navigateHandler}>BACK</button>
               <h2>{character.name}</h2>
               <h3><b>Status:</b> {character.status}</h3>
               <h3><b>Especie:</b> {character.species}</h3>
               <h3><b>Género:</b> {character.gender}</h3>
               <h3><b>Origen:</b> {character.origin?.name}</h3>
               <img src={character.image} alt='imagen' />
            </div>
      </div>
    )
}

export default About;