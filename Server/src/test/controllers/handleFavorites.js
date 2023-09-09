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
    allFavs = allFavs.filter(favorite => favorite.id !== id);
    console.log(allFavs);
    res
        .status(200)
        .send(allFavs)
}

module.exports = {
    postFav,
    deleteFav
}