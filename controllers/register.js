const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CONSTANTS = require('../config/constant');

const userRegisterController = (req,res)=>{
    console.log('Registering the user');
    const userDetails = req.body;
    console.log('Received user details =>',userDetails);
    const name = userDetails.name;
    const username = userDetails.username;
    const phone = userDetails.phone;
    const email = userDetails.email;
    const password = userDetails.password;
    const saltRound = 10;

    try{
        bcrypt.genSalt(saltRound,(err,salt)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    message:'User has not registered, please try again'
                });

            }
            else{
                bcrypt.hash(password,salt,(err,hashedPwd)=>{
                    if(err){
                        console.log(err);
                        res.status(500).json({
                            message:'User has not registered, please try again'
                        });



                    }

                    else{
                        console.log('User has registered successfully');
                        CONSTANTS.userDetails.push({
                            name,
                            email,
                            phone,
                            password : hashedPwd
                        });
                        res.status(200).json({
                            message: 'User has Registered Successfully.'
                        })
                    }
                })
            }
        })
    }
    catch(err){
        res.status(200).json({
            message: "User has Registered Successfully"
        })
    }

};

module.exports = {userRegisterController}
