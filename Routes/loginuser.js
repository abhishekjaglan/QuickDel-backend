const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const  { body , validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "LearningToMakeAuthorizationTokenForBetterSafety1298$"

router.post('/loginuser',
    body('email','Incorrect Email').isEmail(),
    body('password', 'Password too short').isLength({ min : 5 }), 
    async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let user_data = await User.findOne({email})

        if(!user_data){
            return res.status(400).json({ errors: "Try logging in with correct email" })
        }

        const passwordCompare = await bcrypt.compare(req.body.password, user_data.password);

        if(!passwordCompare){
            return res.status(400).json({ errors: "Password Incorrect" })
        }
        
        const authData = {
            user:{
                id:user_data.id
            }
        }

        const authToken = jwt.sign(authData, jwtSecret)
        return res.json({success: true, authToken:authToken})
            
    } catch (error) {
        console.error(error);
        res.json({success:false});
    }
})

module.exports = router;