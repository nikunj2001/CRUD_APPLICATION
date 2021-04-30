const express = require('express')
const app = express();
const dotenv= require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const connect = require('./server/database/connection')

dotenv.config({path:'config.env'})
const PORT = 3000 || process.env.PORT;

// log request
app.use(morgan('tiny'))
// MongoDb
connect();

// body parser
app.use(bodyparser.urlencoded({extended:true}))

// view engine
app.set('view engine',"ejs")

// Load assests
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
//  Load Routeres
app.use('/',require('./server/routes/router'));

app.listen(PORT,()=>{
    console.log(`listeing on port ${PORT}`);
})