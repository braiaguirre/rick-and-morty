const {Favorite} = require('../DB_connection');

const deleteFavorite = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) return res.status(400).send('Empty data');
        await Favorite.destroy({where: {id}});
        const favorites = await Favorite.findAll();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = deleteFavorite;