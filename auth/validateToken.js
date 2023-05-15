const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const cookies = req.headers.cookie;
    if (!cookies) return res.status(404).send('no cookies');
    const token = cookies.split("=")[1];
    if (!token) return res.status(404).send('no token');
    
    try {
        const verified = jwt.verify(token, process.env.secretkey);
        if (verified) {
            req.id = verified._id;
            next();
        } 
        else {
            return res.status(422).send('token not verified');
        }
    } catch (error) {
        res.status(422).send(error)
    }
}