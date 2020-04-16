const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // to parse the incoming i/p json data..
const cors = require('cors');

app.use(bodyParser.json()); // to parse the input JSON
const postRouts = require('./Routes/posts');
const searchRouts = require('./Routes/search');
app.use('/login',postRouts);
app.use('/search',searchRouts);
app.use(cors());

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
// GONNA CREATE ROUTES
    // moved to specific folder Routes......

// Connect to DB(Mongo)
mongoose.connect('mongodb://localhost/Rest',{ useNewUrlParser: true },() => 
{
    console.log("connected to DB");
});

//LISTENING TO THE SERVER
app.listen(8000);
