const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

async function getImage(req, res) {
    console.log('getimage.js')
    try {
        const {id} = req.params;
        const {data} = await axios.get(`${URL}${id}`)
        res.status(200).send(data.image);
    } catch (error) {
        if (error.response) res.status(404).send('Character not found, enter a valid ID.');
        else res.status(500).end('Could not connect.');
    };
}

module.exports = getImage;