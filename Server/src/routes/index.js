// DEPENDENCIES
const Router = require('express');

// CONTROLLERS
const getCharacter = require('../controllers/getCharacter');
const postCustomCharacter = require('../controllers/postCustomCharacter');
const login = require('../controllers/login');
const postUser = require('../controllers/postUser');
const getLocations = require('../controllers/getLocations');
const getImage = require('../controllers/getImage');
const postFavorite = require('../controllers/postFavorite');
const deleteFavorite = require('../controllers/deleteFavorite');

const mainRouter = Router();

mainRouter.get('/character/', getCharacter);
mainRouter.get('/character/:id', getCharacter);
mainRouter.post('/character', postCustomCharacter);
mainRouter.get('/location', getLocations);
mainRouter.get('/image/:id', getImage);
mainRouter.get('/login', login);
mainRouter.post('/login', postUser);
mainRouter.post('/fav', postFavorite);
mainRouter.delete('/fav/:id', deleteFavorite);

module.exports = mainRouter;