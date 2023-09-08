const users = require('../utils/users');
const {EMAIL, PASSWORD} = require('../utils/users');

function login(req, res) {
    const {email, password} = req.query;
    if (email === EMAIL && password === PASSWORD) res
        .status(200)
        .send({
            access: true
        })
    else res
        .status(200)
        .send({
            access: false
    })
}

module.exports = login;