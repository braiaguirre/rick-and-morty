const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

async function getCharById(req, res) {
    try {
        const {id} = req.params;
        const {data} = await axios.get(`${URL}${id}`)
        res
        .status(200)
        .send({
            id: data.id,
            name: data.name,
            gender: data.gender,
            species: data.species,
            origin: data.origin,
            image: data.image,
            status: data.status
        });
    } catch (error) {
        if (error.response) res.status(404).send('ERROR_404');
        else res.status(500).end(error.message);
    };
}

module.exports = getCharById;