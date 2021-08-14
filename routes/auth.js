const router = require('express').Router();
const User = require('../model/User');
const bodyParser = require('body-parser');
const {registerValidation, loginValidation} = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const redisClient = require('../model/Redis');

router.post('/register', async (req,res)=>{

    // validating user before adding it to database
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the database
    const emailExist = await User.findOne({email : req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');
    
    // HASH the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User
    const user = new User({
        firstName: req.body.firstName,
        LastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });
    // save a new user
    try{
        const savedUser = await user.save();
    }catch(err){
        res.status(400).send(err);
    }
});

// LOGIN
router.post('/login', async (req,res)=>{

    try{
        if (req.cookies.session === ""){
            const uuidv4 = uuid.v4();
            const emailID = req.body.email;
            res.cookie('session', uuidv4);
            redisClient.set(uuidv4, emailID, (err)=>{
                if(err != null){
                    res.status(404).json({message: err});
                }
            });
        }
        if (uuid.validate(req.cookies.session)){
            return res.status(400).json({message : 'Wrong UUID'});
        }
    }catch(err){
        res.status(400).send({message: 'Invalid Token'});
    }

    redisClient.exists(req.cookies.session, (err, reply) => {
        if (reply != 1) {
            return res.status(400).json({ message: err });
        }
    });
    

    // validating user before adding it to database
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the email doent exist
    const user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong');
    // check password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');

    // Create and assing an token
    // const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token',token).send(token);

});

module.exports = router;