// const http = require('http');
// const morgan = require('morgan');
const getCharById = require('./test/controllers/getCharById');
// const PORT = 3001;

// http.createServer((req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     const {url} = req;
    
//     if (url.includes('/rickandmorty/character/')) {
//         let id = url.split('/').pop();
//         return getCharById(res, id);
//     }
// }).listen(PORT);

const express = require('express');

const PORT = 3001;
const server = express();

server.listen(PORT, () => {
    console.log('Server raised in port: ' + PORT);

})

server.use(express.json());
// server.use(morgan('dev'));

server.get('/', getCharById);