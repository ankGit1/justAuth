const dotenv = require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const router = require('./routes/loginRouter')
const auth = require('./auth/auth')


mongoose.connect(process.env.connectwith_db)
.then(()=>console.log('db connected..'))
.catch((Err)=>console.log(Err))

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use('/deliver',router)
app.use('/verify',auth)

app.listen(5000,()=>console.log('app running on port 5000'))