const http = require('http');
const { getCharById } = require('./test/controllers/getCharById');
const PORT = 3001;

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {url} = req;
    if (url.includes('/rickandmorty/character/')) {
        let id = url.split('/').pop();
        return getCharById(res, id);
    }
}).listen(PORT);

