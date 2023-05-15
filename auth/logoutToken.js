const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) return res.status(404).send('no token');

    const verified = jwt.verify(prevToken, process.env.secretkey);
    try {
        if (verified) {
            res.clearCookie('token');
            next();
        }
        else {
            return res.status(422).send('token not verified');
        }
    } catch (error) {
        return res.status(422).send('something went wrong..');
    }
}