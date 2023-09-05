import styles from './Detail.module.css';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function About() {
    const {id} = useParams();
    const [character, setCharacter] = useState([]);
    const navigate = useNavigate();

    const navigateHandler = () => navigate('/home');

    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({data}) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, []);

    return (
        <div className={styles.detail}>
            <div className={styles.card}>
               {console.log(character)}
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