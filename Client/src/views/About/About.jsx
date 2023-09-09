// STYLES
import styles from './About.module.css';

// COMPONENTS
import Card from '../../components/Card/Card.jsx';

// ASSETS
import img from '../../assets/about-profile.jpg';

function About({onClose}) {
    document.title = 'Rick and Morty > About'

    // PERSONALIZED CHARACTER
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

export default About;