if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({ path: '.env' })
}

//import express
const express = require('express');
/*The express module returns a function. 
This function returns an object which can be used to configure Express application (app).*/
const app = express();
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')


app.set('view engine', 'ejs')
//set where our views are going to be comign from and create a foldre for the same
app.set('views', __dirname + '/views')
//hookup express layouts. Layout files will be stored here so that we dont duplicate headers and footers in each file
app.set('layouts', 'layouts/layouts')

//telling we want to use express layouts
app.use(expressLayouts)
//files including style sheets, images,etc
app.use(express.static('public'));

//database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true ,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', error =>{ console.error(error)})
db.once('open', () =>{ console.log("Connected to Moongose")})

app.use('/', indexRouter)

app.listen(process.env.PORT || 5000);