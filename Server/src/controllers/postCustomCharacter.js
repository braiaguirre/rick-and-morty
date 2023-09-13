async function postCustomCharacter(req, res) {
    try {
        const {character, customCharacters} = req.body;
        const id = customCharacters.length + 826;
        console.log(character);
        res.status(200).send({...character, id: id});
    } catch (error) {
        res.status(500).end('Could not create character.');
    };
}

module.exports = postCustomCharacter;