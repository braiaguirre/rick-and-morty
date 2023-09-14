const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

async function getCharacter(req, res) { // TODO: PROMISE ALL 
    console.log('getCharacter.js')
    try {
        const {id} = req.params;
        const {name, gender, species, origin, status} = req.query;
       
        let endpoint = URL;
        if (id) endpoint = `${endpoint}${id}`;
        else endpoint = `${endpoint}?name=${name}&gender=${gender}&species=${species}&status=${status}`;

        const {data} = await axios.get(endpoint);
        if (data.results) {
            res.status(200).send(data.results);
        } else {
            res.status(200).send([data])};
    } catch (error) {
        if (error.response) res.status(404).send('No character found.');
        else res.status(500).end('Could not connect.');
    };
}

module.exports = getCharacter;