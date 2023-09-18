// STYLES
import styles from './Detail.module.css';

// DEPENDENCIES
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

// ACTIONS
import {getCharacterDetail, clearCharacterDetail} from '../../redux/actions/actions';

import DetailedCard from '../../components/DetailedCard/DetailedCard';

function Detail() {

    // HOOKS
    const dispatch = useDispatch();

    // STATES
    const {id} = useParams();
    const character = useSelector(state => state.characterDetail);

    // LOAD DATA
    useEffect(() => {
        dispatch(getCharacterDetail(Number(id)));
        return () => dispatch(clearCharacterDetail());
    }, []);

    return (
        <div className={styles.detail}>
            <DetailedCard 
                character={character}
                key={character.id} />
        </div>
    )
}

export default Detail;