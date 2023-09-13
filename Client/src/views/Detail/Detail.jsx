// STYLES
import styles from './Detail.module.css';

// DEPENDENCIES
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';

// ACTIONS
import {getCharacterDetail} from '../../redux/actions/actions';

// CARD
import Card from '../../components/Card/Card';

function About() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();
    const character = useSelector(state => state.characterDetail);

    const closeHandler = () => navigate('/home');
    
    useEffect(() => {
        dispatch(getCharacterDetail(Number(id)))
    }, []);

    return (
        <div className={styles.detail}>
            <Card 
                character={character} 
                closeHandler={closeHandler} 
                key={character.id} />
      </div>
    )
}

export default About;