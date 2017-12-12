const express = require('express');
const router = express.Router();
const models  = require('../models');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*GET User info from token*/
router.get('/info' , function(req, res) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError'){
                res.status(401).send("Votre session a expiré.");
            }
            else {
                res.status(403).send("Identifiants invalides.");
            }
	  return;
        }
        models.user.findById(decoded.userId)
            .then(user => {
                if(user == null)
                    res.send("Identifiants invalides.");
                else
                    res.status(200).jsonp({
                        userId: user.user_id,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email
                    });
            }).catch(err => res.send(err));
    });
});

/*Sign in and get a token*/
router.post('/signin', (req, res, next) => {
    models.user.findOne({where: { email: req.body.email}})
        .then(user=>{
            if(user === null) {
                res.status(400).send("Identifiants invalides.");
            }
            else
            {
                if(!bcrypt.compareSync(req.body.password, user.password)){
                    res.status(400).send("Identifiants invalides.");
                }
                else {
                    const secret = process.env.AUTH_SECRET;
                    const newToken = jwt.sign({userId: user.user_id}, secret, { expiresIn: 60 * 60 });
                    res.status(200).jsonp({
                        token: newToken,
                        userId: user.user_id,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email,
                    });
                }
            }
        }).catch(err => {res.send(err)})
});

/*Create user account*/
router.post('/signup', function(req, res) {
    models.user.findOne({where: {email: req.body.email}})
        .then(user => {
            if( user !== null ){
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

                return models.user.create({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: hashPassword
                }).
                then(newUser => {
                  res.status(201).jsonp({
                    message: "L'utilisateur " + newUser.firstname + " a été crée."
                  });
                });
            }
        }).catch(err => res.send(err))
});

/** PUT Modifie utilisateur*/
router.put('/:id' , function(req, res) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError'){
                res.status(401).send("Votre session a expiré.");
            }
            else {
                //res.status(403).send(err.message);
                res.status(403).send("Identifiants invalides.");
            }
        }

        if (parseInt(decoded.userId) != parseInt(req.params.id)) {
            res.status(400).send("Opération non autorisée.");
        }

        else {
            models.user.findById(req.params.id).
            then(user => {
                if(user == null){
                    res.status(400).send("L'utilisateur n'existe pas.");
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
                    models.user.findOne({where: {email: req.body.email}}).
                    then(userEmail => {
                        if(userEmail.email === req.body.email && userEmail.user_id != req.params.id)
                        {
                            res.status(400).send('Un utilisateur existe déjà avec cet email.');
                        }
                        else
                        {
                            models.user.update(
                                { email: req.body.email, password: hashPassword},
                                { where: { user_id: req.params.id}}).
                            then( updatedUser =>{
                                res.status(200).jsonp({
                                    userId: updatedUser.user_id,
                                    email: req.body.email,
                                });
                            }).catch(err=> {res.send(err)})
                        }
                    }).catch(err=> {res.send(err)})
                }
            }).catch(err=> {res.status(500).send(err)})
        }
    });
});

/* Delete utilisateur*/
router.delete('/:id' , function(req, res) {
    models.user.findById(req.params.id).
    then(user=>{
        if(user==null)
            res.send("user not found");
        else
        {
            models.user.destroy(
                { where: {user_id :req.params.id}}).
            then(
                res.send("user deleted")
            ).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

module.exports = router;
