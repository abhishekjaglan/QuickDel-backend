const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const  { body , validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post('/NewUser', 
body('email','Incorrect Email').isEmail(),
body('name',).isLength({ min : 5 }),
body('password', 'Password too short').isLength({ min : 5 }),
async (req,res) => {
    console.log(req.body.name,
        req.body.password,
        req.body.email,
        req.body.location)

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({success:true}))
            
    } catch (error) {
        console.error(error);
        res.json({success:false});
    }
})



module.exports = router;