const axios = require('axios');

function getCharById(req, res) {
        const {id} = req.params;

        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(({data}) => {
            if (data) {
                res
                .status(200)
                .send({
                    id: id,
                    name: data.name,
                    gender: data.gender,
                    species: data.species,
                    origin: data.origin,
                    image: data.image,
                    status: data.status})
            } else {
                res
                .status(404)
                .send('Not found')
            }
        })
        .catch(({error}) => {
            res
                .writeHead(500, { 'Content-Type': 'text/plain' })
                .end(error.message);
        });
}

const URL = 'https://rickandmortyapi.com/api/character/';


module.exports = getCharById;