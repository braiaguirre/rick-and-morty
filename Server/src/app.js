const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes/index');

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use('/rickandmorty', mainRouter);

module.exports = server;