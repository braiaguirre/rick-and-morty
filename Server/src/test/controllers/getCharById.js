const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

function getCharById(req, res) {
    const {id} = req.params;
    axios.get(`${URL}${id}`)
    .then(({data}) => {
        res
        .status(200)
        .send({
            id: id,
            name: data.name,
            gender: data.gender,
            species: data.species,
            origin: data.origin,
            image: data.image,
            status: data.status
        })
    })
    .catch((error) => {
        if (error.response) {
            res
                .status(404)
                .send('Character not found!');
        } else {
            res
                .status(500)
                .end(error.message);
        }
        
    });
}

module.exports = getCharById;