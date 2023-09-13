// DEPENDENCIES
const Router = require('express');

// CONTROLLERS
const getCharacter = require('../controllers/getCharacter');
const postCustomCharacter = require('../controllers/postCustomCharacter');
const login = require('../controllers/login');
const getLocations = require('../controllers/getLocations');
const getImage = require('../controllers/getImage');
const {addFav, removeFav} = require('../controllers/handleFavorites');

const mainRouter = Router();

mainRouter.get('/character/:id', getCharacter);
mainRouter.post('/character', postCustomCharacter);
mainRouter.get('/location', getLocations);
mainRouter.get('/image/:id', getImage);
mainRouter.get('/login', login);
mainRouter.post('/fav', addFav);
mainRouter.delete('/fav/:id', removeFav);

module.exports = mainRouter;