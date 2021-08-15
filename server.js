const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const errorController = require('./controllers/error');
require('dotenv/config');

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// MiddleWare
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(cookieParser());

// Connect to DB
mongoose.connect(process.env.DB_SRV, {useNewUrlParser : true, useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true});

// Route Middleware
app.use('/api/v1/user', authRoute);
app.use('/api/v1/posts', postRoute);

app.use(errorController.get404Error);

app.listen(5000);