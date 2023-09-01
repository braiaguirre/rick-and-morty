import styles from './About.module.css';
import Card from '../../components/Card/Card.jsx';
import img from '../../assets/about-profile.jpg';

export default function About({onClose}) {
    const character = {
        id: 999,
        name: 'Brian Aguirre',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: {
            name: 'Earth (C-137)'
        },
        image: img,
    }

    return (
        <div className={styles.about}>
            <Card character={character} onClose={onClose} />
        </div>
    )
}