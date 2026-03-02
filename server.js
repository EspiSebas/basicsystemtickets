const express = require('express')
require('dotenv').config();
const router = require("./backend/router/routes")
const errorHandler = require("./backend/middleware/error")
var app = express()



app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', router())
app.use(errorHandler);
app.listen(3000);
