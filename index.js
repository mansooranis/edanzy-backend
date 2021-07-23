const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
var cors = require("cors");

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require("./routes/users")

//Enabling Cors
app.use(cors());

// Connect to DB
mongoose.connect(process.env.DB_SRV, {useNewUrlParser : true, useUnifiedTopology: true},()=>console.log('connected to db!'));

// MiddleWare
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use("/api", userRoute);


app.listen(5000, () => {console.log("Server running on port 6000")});
