// let allFavs = []; ---- > esto no me gusta acá, prefiero manejarlo desde el estado global, así que modifiqué la HW

function postFav(req, res) {
    const character = req.body;
    res.status(200).send(character)
}

function deleteFav(req, res) {
    const {id} = req.params;
    res.status(200).send(id)
}

module.exports = {
    postFav,
    deleteFav
}