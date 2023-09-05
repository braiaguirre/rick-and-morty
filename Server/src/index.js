const http = require('http');
const { useParams } = require('react-router-dom');
const characters = require('./test/utils/data');

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let {url} = req;
    let i = url.lastIndexOf('/') + 1;
    id = url.slice(i);
    url = url.slice(0, i);
    if (url === '/rickandmorty/character/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        characters.forEach(character => {
            if (character.id === Number(id)) 
                return res.end(JSON.stringify(character));
        }) 
    }
}).listen(3001);

