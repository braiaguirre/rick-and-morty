const {User} = require('../DB_connection');

const postUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password ) res.status(400).send('Empty data');
        const user = await User.create({email, password});
        res.send(200).send(user);
    } catch(err) {
        res.send(500).send(err.message);
    }
}

module.exports = postUser;