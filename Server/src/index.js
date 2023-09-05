const http = require('http');
const { useParams } = require('react-router-dom');
const characters = require('./test/utils/data');

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {url} = req;
    if (url === '/rickandmorty/character') {
        // const {id} = useParams();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(characters));
    }
}).listen(3001);

