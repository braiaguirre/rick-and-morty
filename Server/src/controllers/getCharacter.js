const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

async function getCharacter(req, res) {
    try {
        const {id} = req.params;
        const {name} = req.query;
        const {data} = await axios.get(`${URL}${id ? id : '?name=' + name}`);
        if (data.results) {
            res.status(200).send(data.results);
        } else {
            res.status(200).send([data])};
    } catch (error) {
        if (error.response) res.status(404).send('Character not found, enter a valid ID.');
        else res.status(500).end('Could not connect.');
    };
}

module.exports = getCharacter;