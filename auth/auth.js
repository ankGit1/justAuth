const router = require('express').Router();
const loginModule = require('../modules/loginModule')
const validateToken = require('./validateToken')
const logoutToken = require('./logoutToken')


router.get('/checktoken', validateToken, async (req, res) => {
    const id = req.id;
    try {
        const showUser = await loginModule.findById(id)
        res.status(200).send(showUser);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/logout', logoutToken, async (req, res) => {
    res.send('logout successfully..')
})

module.exports = router;
