//import { require } from "../../front-src/src/test";

const express = require('express');
const router = express.Router();
const cors = require('cors');
const models  = require('../models');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* GET Users */
router.get('/', function(req, res) {
    models.users.findAll().
    then(users=>{
        if(users==null)
            res.send("users not found");
        else
            res.send(users);
    }).catch(err=> {res.send(err)})
});

/*GET User by id*/
router.get('/:id' , function(req, res) {
    models.users.findById(req.params.id).
    then(user=>{
        if(user==null)
        res.status(400).send("Utilisateur nan trouvé");
        else
        res.status(200).send(user);
    }).catch(err=> {res.send(err)})
});

/*Sign in and get a token*/
router.post('/signin', cors(), (req, res) => {
    models.users.findOne( {where: {email: req.body.email}}).
    then(user=>{
        if(user === null) {
            res.status(400).send("L'email correspond n'existe pas");
        }
        else
        {
            if(!bcrypt.compareSync(req.body.password, user.password)){
                res.status(400).send('Mot de passe incorrect');
            }
            else {
               const secret = process.env.AUTH_SECRET;
                const newToken = jwt.sign({
                    userId: user.user_id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastnames
                },secret, { expiresIn: 60 * 60 });
                res.status(200).jsonp({
                    token: newToken,
                    UserId:user.user_id,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    Email: user.email,
                });
            }
        }
    }).catch(err=> {res.send(err)})
});

/*Create user account*/
router.post('/signup', cors(), function(req, res) {
    models.users.findOne({where: {email:req.body.email}}).
    then(user=>{
        if(user !== null){
            res.status(400).send('Un utilisateur existe déjà avec cet email.');
        }
        else {
            if (!validator.isEmail(req.body.email)){
                res.status(400).send('Email invalide.');
            }

            if (!validator.isLength(req.body.firstname, { max: 50 })){
                res.status(400).send('Le prénom est trop long.');
            }

            if (!validator.isLength(req.body.lastname, { max: 50 })){
                res.status(400).send('Le nom est trop long.');
            }

            if (!validator.isLength(req.body.password, { min:8 })){
                res.status(400).send('Le mot de passe est trop court.');
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.password, salt);

            models.users.create({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: hashPassword
            }).
            then(newUser=>{
                let message = "L'utilisateur " + newUser.firstname + " a été crée.";
                res.status(201).jsonp({
                    message: message,
                });
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/** PUT Modifie utilisateur*/
router.put('/:id' , function(req, res) {
    models.users.findById(req.params.id).
    then(user=>{
        if(user == null){
            res.status(400).send("cette utilisateur n'existe pas.");
        }
        else
        {
            if (!validator.isEmail(req.body.email)){
                    res.status(400).send('Email invalide.');
                }
    
                if (!validator.isLength(req.body.password, { min:8 })){
                    res.status(400).send('Le mot de passe est trop court.');
                }
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(req.body.password, salt);
               models.users.findOne({where: {email: req.body.email}}).
               then(userEmail=>{
                  if(userEmail.email==req.body.email && userEmail.user_id!=req.params.id)
                  {
                    res.status(400).send('Un utilisateur existe déjà avec cet email.');
                  }
                  else
                  {
                    models.users.update(
                        {email:req.body.email,password:hashPassword},
                        { where: { user_id:req.params.id}}).
                      then(UpdateUser=>{
                          console.log(req.body.email);
                        res.status(200).jsonp({
                            UserId:req.params.id,
                            Email: req.body.email,
                            message: "Informations modifiées avec succès",
                        });
                    }).catch(err=> {res.send(err)})
                  }
              }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});
/* Delete utilisateur*/
router.delete('/:id' , function(req, res) {
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
