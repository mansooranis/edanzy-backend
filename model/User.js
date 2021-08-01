const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required : true,
        min : 3
    },
    lastname:{
        type:String,
        required : true,
        min : 3,
        default:"",
    },
    email : {
        type : String,
        required : true,
        max : 255,
        min : 6
    },
    password : {
        type : String,
        required : true,
        min : 4,
        max : 255
    },
    date : {
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('User', userSchema);
