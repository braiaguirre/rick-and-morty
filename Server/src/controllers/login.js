// const {EMAIL, PASSWORD} = require('../utils/users');
const {User} = require('../DB_connection');

const login = async (req, res) => {
    try {
        const {email, password} = req.query;
        if (email === '' || password === '') return res.status(400).send('Empty data');
        const user = await User.findOne({where: {email}});
        if (!user) return res.status(404).send('Not found');
        user.password === password ? res.status(200).json({access: true}) : res.status(403).send('Incorrect password');
    } catch(err) {
        res.status(500).send(err.message);
    }
    
}

module.exports = login;