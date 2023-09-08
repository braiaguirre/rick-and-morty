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
                    status: data.status
                })
            }
        })
        .catch((error) => {
            res
                .writeHead(500, { 'Content-Type': 'text/plain' })
                .end(error.message);
        });
}

module.exports = getCharById;