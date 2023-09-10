const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/location/';

function getLocation(req, res) {
    const {id} = req.params;
    console.log(id);
    axios.get(`${URL}${id ? id : ''}`)
    .then(({data}) => {
        res
        .status(200)
        .send(data)
    })
    .catch((error) => {
        if (error.response) {
            res
                .status(404)
                .send('ERROR_404');
        } else {
            res
                .status(500)
                .end(error.message);
        }
        
    });
}

module.exports = getLocation;