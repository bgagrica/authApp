const { sequelize, Users,Blogs } = require('../models');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Joi = require('joi');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));




route.post('/register', (req, res) => {
    

    const sema = Joi.object().keys({
        name: Joi.string().trim().min(4).max(12).required(),
        email: Joi.string().trim().email().required(),
        nickname:Joi.string().trim().required(),
        password: Joi.string().min(4).required(),
        canMakeBlogs: Joi.boolean(),
        role: Joi.string()
    });

    sema.validate(req.body, (err, result) => {
        if (err)
            res.send('Parameters not valid')
        else {
            var canmakeblogs = false
            if(req.body.role == 'admin' || req.body.role=='moderator')
                canmakeblogs = true
              const obj = { 
                    name:req.body.name,
                    email:req.body.email,
                    nickname:req.body.nickname,
                    password: bcrypt.hashSync(req.body.password, 10),
                    canMakeBlogs: canmakeblogs,
                    role:req.body.role
                }

                console.log(obj)
           
            Users.create(obj).then( rows => {

                const usr = {
                    userId: rows.id,
                    user: rows.name
                };
        
                const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
        
            })
            .catch( err => res.status(500).json(err) );
        }
    });
 

});

route.post('/login', (req, res) => {
   
    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {
            
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    id: usr.id,
                    name: usr.name,
                    canMakeBlogs: usr.canMakeBlogs,
                    role: usr.role,
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json({ msg: "error"}) );
});


module.exports = route;