let allFavs = [];

function postFav(req, res) {
    const fav = req.body;
    allFavs.push(fav);
    res
        .status(200)
        .send(allFavs)
}

function deleteFav(req, res) {
    const {id} = req.params;
    res
        .status(200)
        .send(allFavs.filter(favorite => favorite.id !== Number(id)))
}

module.exports = {
    postFav,
    deleteFav
}