const morgan = require('morgan');
const express = require('express');
const mainRouter = require('./test/routes');

const PORT = 3001;
const server = express();

server.listen(PORT, () => {
    console.log('Server raised in port: ' + PORT);

})

server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
     );
     res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
     );
     next();
})
server.use(express.json());
server.use(morgan('dev'));
server.use('/rickandmorty', mainRouter);