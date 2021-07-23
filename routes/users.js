const router = require('express').Router();
const User = require("../model/User");

router.get("/testusers", async (req, res) => {
    try{
        const users = await User.find();
        res.send(users)
    }catch(err){
        res.send({message:err});
    }
})

module.exports = router;