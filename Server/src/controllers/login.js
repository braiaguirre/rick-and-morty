// const {EMAIL, PASSWORD} = require('../utils/users');
const {User} = require('../DB_connection');

const login = async (req, res) => {
    try {
        const {email, password} = req.query;
        if (email === '' || password === '') res.status(400).send('Empty data');
        else {
            const users = await User.findAll();
            users.forEach(user => {
                if (user.email === email && user.password === password)
                    return res.send(200).send({access:true});
                else
                    return res.send(403).send('Incorrect');
            })
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
    
}

module.exports = login;