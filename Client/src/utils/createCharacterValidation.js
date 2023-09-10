export default function validation(character) {
    const errors = {};

    if (!character.name) errors.name = true;
    if (!character.gender) errors.gender = true;
    if (!character.species) errors.species = true;
    if (!character.origin.name) errors.origin = true;
    if (!character.status) errors.status = true;

    return errors;
}