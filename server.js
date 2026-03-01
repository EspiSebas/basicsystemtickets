const express = require('express')
require('dotenv').config();
require('./backend/config/connection')
console.log(process.env.db_user);

var app = express()

app.use('/',function(req,res){
    res.send('Hola')
})

app.listen(3000);

console.log('The app is listening to http://localhost:3000');