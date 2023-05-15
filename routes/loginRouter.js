const router = require('express').Router();
const loginModule = require('../modules/loginModule')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerSchema, loginSchema} = require('../checkData')

router.post('/register',async(req,res)=>{
    
    const { error } = registerSchema(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const checkEmail = await loginModule.findOne({email : req.body.email});
   if (checkEmail) return res.status(422).send('this email is already present, try another');

   const salt = bcrypt.genSaltSync(10);
   const hashPassword = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new loginModule({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword,
    })

    try {
        const userRegister = await newUser.save();
        res.status(200).send(userRegister)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.post('/login', async (req, res) => {

    const { error } = loginSchema(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const userLogin = await loginModule.findOne({ email: req.body.email });
    if (!userLogin) return res.status(422).send('please check your name or password');

    const userPass =  bcrypt.compareSync(req.body.password, userLogin.password);
    if (!userPass) return res.status(422).send('please check your name or password');

    if (userLogin && userPass) {
        
        const token = jwt.sign({ _id: userLogin._id, name: req.body.name }, process.env.secretkey,
            { expiresIn: 1000 * 60 * 60 })

        res.cookie("token", token,
            {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60)
            }
        ).json(token);
    }
})

module.exports = router