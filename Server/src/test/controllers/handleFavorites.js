let favorites = [];

function postFav(req, res) {
    favorites.push(req.body);
    res
        .status(200)
        .send(favorites)
}

function deleteFav(req, res) {
    favorites = favorites.filter(favorite => favorite.id === req.body.id);
    res
        .status(200)
        .send(favorites)
}

module.exports = {
    postFav,
    deleteFav
}