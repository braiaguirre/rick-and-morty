const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/location/';

async function getLocations(req, res) {
    try {
        const {data} = await axios.get(`${URL}`);
        res.status(200).send(data.results);
    } catch (error) {
        if (error.response) res.status(404).send('ERROR_404');
        else res.status(500).end(error.message);
    };
}

module.exports = getLocations;