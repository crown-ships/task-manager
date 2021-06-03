const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesURLs = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require("passport");
const database = require('./database');
const morgan = require('morgan');

const app = express ();

dotenv.config({
 path: path.join(__dirname, ".env")
});

if (process.env.NODE_ENV !== 'test') {
  database();
}

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./server/passport")(passport);

app.use('/api', routesURLs);

module.exports = app;
