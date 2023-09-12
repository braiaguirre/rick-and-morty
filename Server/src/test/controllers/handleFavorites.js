// let allFavs = []; ---- > esto no me gusta acá, prefiero manejarlo desde el estado global, así que modifiqué la HW

function postFav(req, res) {
    const fav = req.body;
    console.log('aaaaaaaaaaa');
    res.status(200).send(fav)
}

function deleteFav(req, res) {
    const {id} = req.params;
    res.status(200).send(id)
}

module.exports = {
    postFav,
    deleteFav
}