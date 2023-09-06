const axios = require('axios');

const getCharById = (res, id) => {
    return axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(({data}) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                id: id,
                name: data.name,
                gender: data.gender,
                species: data.species,
                origin: data.origin,
                image: data.image,
                status: data.status
            }))
        .catch(({error}) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(error.message);
        });
    });
}

module.exports = { getCharById };