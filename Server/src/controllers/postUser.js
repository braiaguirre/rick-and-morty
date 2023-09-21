const {User} = require('../DB_connection');

const postUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password ) return res.status(400).send('Empty data');
        const [user, created] = await User.findOrCreate({
            where: {
                email,
                password
            }
        });
        created ? res.status(200).json(user) : res.status(400).send('Already exists');
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = postUser;