const {Favorite} = require('../DB_connection');

const postFavorite = async (req, res) => {
    try {
        const {id, name, status, species, gender, origin, image} = req.body;
        if (!id || !name || !status || !species || !gender || !origin || !image) return res.status(400).send('Empty data');
        const [favorite, created] = await Favorite.findOrCreate({
            where: {id, name, status, species, gender, origin: origin.name, image}
        });
        created ? res.status(200).json(favorite) : res.status(400).send('Already exists');
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = postFavorite;