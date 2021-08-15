const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const errorController = require('./controllers/error');
require('dotenv/config');
var cors = require("cors");

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require("./routes/users")

//Enabling Cors
app.use(cors());

// MiddleWare
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(cookieParser());

// Connect to DB
mongoose.connect(process.env.DB_SRV, {useNewUrlParser : true, useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true},()=>console.log('connected to db!'));

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use("/api", userRoute);


app.use(errorController.get404Error);

app.listen(5000, () => {console.log("Server running on port 6000")});
