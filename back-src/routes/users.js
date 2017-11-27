let express = require('express');
let router = express.Router();
var models  = require('../models');

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
