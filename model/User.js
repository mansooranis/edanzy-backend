const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        max : 255,
        min : 6
    },
    fistname:{
        type:String,
        required : true,
        min : 6
    },
    lastname:{
        type: String,
        required: true,
        max : 40
    },
    password : {
        type : String,
        required : true,
        min : 4,
        max : 255
    },
});

module.exports = mongoose.model('User', userSchema);
