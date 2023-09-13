const Router = require('express');
const getCharacter = require('../controllers/getCharacter');
const login = require('../controllers/login');
const getLocation = require('../controllers/getLocation')
const {addFav, removeFav} = require('../controllers/handleFavorites');

const mainRouter = Router();

mainRouter.get('/character/:id', getCharacter);
mainRouter.get('/location/', getLocation);
mainRouter.get('/login', login);
mainRouter.post('/fav', addFav);
mainRouter.delete('/fav/:id', removeFav);

module.exports = mainRouter;