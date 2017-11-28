import { require } from "../../front-src/src/test";

const express = require('express');
const router = express.Router();
const cors = require('cors');
const models  = require('../models');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/* GET Users */
router.get('/', function(req, res, next) {
    models.users.findAll().
    then(users=>{
        if(users==null)
            res.send("users not found");
        else
            res.send(users);
    }).catch(err=> {res.send(err)})
});

/*GET User by id*/
router.get('/:id' , function(req, res, next) {
    models.users.findById(req.params.id).
    then(user=>{
        if(user==null)
            res.send("user not found");
        else
            res.send(user);
    }).catch(err=> {res.send(err)})
});

/*Connexion*/
router.post('/signin', (req, res, next) => {

    models.users.findOne( {where: { email:req.body.email}}).
    then(user=>{
        if(user === null)
            res.status(400).send();
        else
        {
            if(user.password !== req.body.password)
                res.send("incorrect password");
            else
            {
                //Authentification
                req.login(user.firstname, (err) => {
                    if (err) {
                        console.log("err");
                        return;
                    }
                    //sauvegarder la session
                    session = req.session;
                    session.username = user.firstname;
                    res.send('succesLogin');
                })
            }
        }
    }).catch(err=> {res.send(err)})
});

/*Create user account*/
router.post('/singup', cors(), function(req, res, next) {
    models.users.findOne({where: {email:req.body.email}}).
    then(user=>{
        if(user !== null)
            res.status(400).send({
                message : 'Un utilisateur existe déjà avec cet email'
            });
        else
        {
            if (!validator.isEmail(req.body.email)){
                res.status(400).send({
                    message : 'Email invalide'
                });
            }

            if (!validator.isLength(req.body.firstname, { max: 50 })){
                res.status(400).send({
                    message : 'Le prénom estt trop long'
                });
            }

            if (!validator.isLength(req.body.lastname, { max: 50 })){
                res.status(400).send({
                    message : 'Le nom estt trop long'
                });
            }

            if (!validator.isLength(req.body.password, { min:8})){
                res.status(400).send({
                    message : 'Le mot de passe est trop petit'
                });
            }

            let hashPassword = bcrypt.hashSync(req.body.password);

            models.users.create({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: hashPassword
            }).
            then(res=>{
                res.status(201).send({
                    Message: "User created",
                    Password: hashPassword
                });
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/** PUT Modifie utilisateur*/
router.put('/:id' , function(req, res, next) {
    models.users.findById(req.params.id).
    then(user=>{
        if(user==null)
            res.send("user not found");
        else
        {
            models.users.update(
                {email:req.body.email,password:req.body.password},
                { where: { user_id:req.params.id}}).
            then(ress=>{
                res.send("user updated");
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});
/* Delete utilisateur*/
router.delete('/:id' , function(req, res, next) {
    models.users.findById(req.params.id).
    then(user=>{
        if(user==null)
            res.send("user not found");
        else
        {
            models.users.destroy(
                { where: {user_id :req.params.id}}).
            then(ress=>{
                res.send("user deleted");
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

module.exports = router;
