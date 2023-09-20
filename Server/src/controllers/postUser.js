const postUser = async (req, res) => {
    const {email, password} = req.body;
    if (email === '' || password === '') res.status(400).send('Empty data');    // TODO: IMPROVE VALIDATION
}

export default postUser;