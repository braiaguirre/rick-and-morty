// STYLES
import styles from './Detail.module.css';

// DEPENDENCIES
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';

// ACTIONS
import {getCharacterDetail, clearCharacterDetail} from '../../redux/actions/actions';

import DetailedCard from '../../components/DetailedCard/DetailedCard';

function Detail(editCharacterHandler) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();
    const character = useSelector(state => state.characterDetail);

    const closeHandler = () => navigate('/home');
    
    useEffect(() => {
        dispatch(getCharacterDetail(Number(id)));
        return () => dispatch(clearCharacterDetail());
    }, []);

    return (
        <div className={styles.detail}>
            <DetailedCard 
                character={character}
                closeHandler={closeHandler} 
                editCharacterHandler={editCharacterHandler}
                key={character.id} />
        </div>
    )
}

export default Detail;