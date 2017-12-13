const express = require('express');
const router = express.Router();
const models  = require('../models');
const jwt = require('jsonwebtoken');
const validator = require('validator');

/*GET: list of projects with their product Owner*/
router.get('/' , function(req, res) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(401).send("Votre session a expiré.");
            }
            else {
                //res.status(403).send(err.message);
                res.status(401).send("Identifiants invalides.");
            }
        }
        else{
            models.project.findAll({
                attributes: ['project_id', 'name', 'description', 'git'],
                include: [{
                    model: models.user,
                    as: 'productOwner',
                    attributes: ['firstname', 'lastname'],
                    where: {
                        user_id: {[Op.ne]: parseInt(decoded.user.id)}
                    }
                }]
            })
                .then(projects => {

                    res.status(200).jsonp(projects);
                }).catch(err => {res.send(err)})
        }
    })
});

/*GET: list of projects the user is contributing to*/
router.get('/user/:id' , function(req, res) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(401).send("Votre session a expiré.");
            }
            else {
                res.status(401).send("Identifiants invalides.");
            }
        }
        else{
            models.project.findAll({
                attributes: ['project_id', 'name', 'description', 'git'],
                include: [{
                    model: models.user,
                    as: 'productOwner',
                    attributes: ['firstname', 'lastname']
                }]
            })
                .then(projects => {
                    res.status(200).jsonp(projects);
                }).catch(err => {res.send(err)})
        }
    })
});

/*POST project with new product owner*/
router.post('/', function(req, res) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError'){
                res.status(401).send("Votre session a expiré.");
            }
            else {
                //res.status(403).send(err.message);
                res.status(401).send("Identifiants invalides.");
            }
        }
        else{
            if (!validator.isLength(req.body.name, {max: 50})){
                res.status(400).send('Le nom du projet est trop long.');
            }
            if (!validator.isLength(req.body.description, {max: 250})){
                res.status(400).send('La description est trop longue.');
            }
            if (!validator.isLength(req.body.git, {max: 250})){
                res.status(400).send('L\'adresse  git est trop longue.');
            }
            models.user.findById(decoded.userId)
                .then(user => {
                    if(user === null) {
                        res.status(401).send("Identifiants invalides.");
                    }
                    else {
                        return models.project.create({
                            name: req.body.name,
                            description: req.body.description,
                            git: req.body.git,
                            productOwnerUserId: user.user_id
                        })
                            .then(newProject => {
                                let message = "Le projet " + newProject.name + " a été crée";
                                res.status(201).jsonp({
                                    message: message,
                                });
                            })
                    }}).catch(err => {res.send(err)})
        }
    });
});

/* POST add user to the project users list */
router.post('/contribute/' , function(req, res, next) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(401).send("Votre session a expiré.");
            }
            else {
                //res.status(403).send(err.message);
                res.status(401).send("Identifiants invalides.");
            }
        }
        else{

            if (parseInt(decoded.userId) !== parseInt(req.body.userId)) {
                res.status(400).send("Opération non autorisée.");
            }
            else {
                models.user.findById(req.body.userId)
                    .then(user => {
                        if (user === null) {
                            res.status(401).send("Identifiants invalides.");
                        }
                        else {
                            return models.project.findById(req.body.projectId)
                                .then(project => {
                                    return project.addUser(user.user_id)
                                        .then(result => {
                                            let message = "Vous êtes maintenant contributeur du projet" + project.name;
                                            res.status(201).jsonp({
                                                message: message,
                                            });
                                        })
                                })
                        }}).catch(err => {res.send(err)})
            }
        }
    })
});

/** Get ProductOwner*/
router.get('/:id/productOwner', function(req, res, next) {
  models.project.findById(req.params.id)
    .then(project => project.getProductOwner()
	  .then(po => {
	    let values = po.dataValues;
	    let productOwner = values.lastname + ' '+ values.firstname;
	    res.status(201).jsonp({
              projectName: project.name,
              productOwner
	    });
	  }))
    .catch(err => res.send(err));
});

/* GET Issues to Project (backlog)*/
router.get('/:id/issues' , function(req, res, next) {
  models.project.findById(req.params.id)
    .then(project => project.getIssues())
    .then(Issues => res.status(200).send(Issues))
    .catch(err=> res.send(err));
});

/* POST Issue to project */
router.post('/:id/issues/' , function(req, res, next) {
  jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
    if (err && err.name === 'TokenExpiredError'){
      res.status(401).send("Votre session a expiré.");
    } else if (err) {
      res.status(403).send("Identifiants invalides.");
    } else if (!validator.isLength(req.body.story, { min: 10 })) {
      res.status(400).send('story invalide.');
    } else {
    models.project.findById(req.params.id)
	.then(project => models.issue.create({
	  story: req.body.story,
	  difficulty: req.body.difficulty,
	  priority: req.body.priority,
	  state: 'TODO',
	  projectProjectId: req.body.projectProjectId
	}))
	.then(NewIssue => res.status(201).jsonp({ message: "Issue crée" }))
	.catch(err => res.send(err));
    }
  });
});

/* PUT Issue */
router.put('/:id/issues/:issue' , function(req, res, next) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError'){
                res.status(401).send("Votre session a expiré.");
            }
            else {
                res.status(403).send("Identifiants invalides.");
            }
        }
        else {
            if(!validator.isLength(req.body.story, { min: 10 })){
               return res.status(400).send('story invalide.');
              }
                models.issue.update(
                {story:req.body.story,difficulty:req.body.difficulty,priority:req.body.priority,state:req.body.state},
                {where:{issue_id:req.params.issue,projectProjectId:req.params.id}})
                .then(() => {
                    res.status(201).jsonp({
                    message: "Modification effectuée",
                  });
                }).catch(err=> {res.send(err)})
        }
    })
})


/* GET Sprints to project*/

router.get('/:id/sprints' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{project.getSprints().
    then(Sprints =>{
        res.status(200).send(Sprints);})
    .catch(err=> {res.send(err)})
    }).catch(err=> {res.send(err)})
});
/** POST sprint to project */
router.post('/:id/sprints/' , function(req, res, next) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError'){
                res.status(401).send("Votre session a expiré.");
            }
            else {
                res.status(403).send("Identifiants invalides.");
            }
        }
    else {
    if (!validator.isLength(req.body.description, { min:10 })) 
           return res.status(400).send('description invalide.');
    if(req.body.dateBegin>=req.body.dateEnd)
           return res.status(400).send('Date fin de sprint doit être supérieure à la date du début');
    models.project.findById(req.params.id)
	.then(project => models.sprint.create({
	  description:req.body.description,
	  dateBegin: req.body.dateBegin,
	  dateEnd: req.body.dateEnd,
	  projectProjectId:req.params.id
	})).then(res.status(201).jsonp({ message: "Sprint crée" }))
    .catch(err => console.log(err));
   }
})
});
/** PUT modifier un sprint associée à un projet */
router.put('/:id/sprints/:idsprint' , function(req, res, next) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError'){
                res.status(401).send("Votre session a expiré.");
            }
            else {
                res.status(403).send("Identifiants invalides.");
            }
        }
        else {
            if(!validator.isLength(req.body.description, { min: 10 })){
                return res.status(400).send('description invalide.');
              }
              if(req.body.dateBegin>=req.body.dateEnd)
              return res.status(400).send('Date fin de sprint doit être supérieure à la date du début');
                models.sprint.update(
                {description:req.body.description,dateBegin:req.body.dateBegin,dateEnd:req.body.dateEnd},
                {where:{sprint_id:req.params.idsprint,projectProjectId:req.params.id}})
                .then(() => {
                    res.status(201).jsonp({
                    message: "Modification effectuée",
                  });
                }).catch(err=> {res.send(err)})
        }
    })
})
/** GET tâches :renvoie la listes des tâches associées à un sprint */
router.get('/:id/sprints/:idSprint' , function(req, res, next) {
  models.task.findAll({
    where:{sprintSprintId:req.params.idSprint,projectProjectId:req.params.id},
    include: [{
       model: models.user,
       attributes: ['firstname', 'lastname']
    }]
  }).
  then(tasks=>{
    res.status(200).send(tasks);})
});

/**liste des utilisateur participants à un projet */
router.get('/:id/team', function(req, res, next) {
    models.project.findAll({
        attributes: ['project_id'],
        include: [{
            model: models.user,
            as: 'productOwner',
            attributes: ['firstname', 'lastname','user_id']
            },
            {
            model: models.user,
            as: 'contributor',
            attributes: ['firstname', 'lastname','user_id']
           }],
           where:{project_id:req.params.id}
    }).
    then(users=>{
        res.status(200).send(users);
    }).catch(err=> {res.send(err)})
  });
/**POST: Ajout d'une tâche au sprint*/
router.post('/:id/sprints/:idsprint' , function(req, res, next) {

    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err && err.name === 'TokenExpiredError'){
          res.status(401).send("Votre session a expiré.");
        } else if (err) {
          res.status(403).send("Identifiants invalides.");
        } else if (!validator.isLength(req.body.description, { min: 10 })) {
          res.status(400).send('description invalide.');
        } else {
          models.task.create({
          description: req.body.description,
          cost: req.body.cost,
          state: 'TODO',
          projectProjectId: req.params.id,
          sprintSprintId:req.params.idsprint,
          userUserId:req.body.userUserId
        })
        .then(res.status(201).jsonp({ message: "Tâche crée" }))
        .catch(err => res.send(err));
    }})
    
});

/** PUT: Modifie le statut de la tâche*/
router.put('/:name/sprints/:id/:tid/' , function(req, res, next) {
    models.project.findById(req.params.name).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            project.getSprints({ where: { sprint_id:req.params.id}}).
            then(sprint =>{
                if(sprint.length==0)
                    res.send("sprint not exist");
                else
                {
                    models.tasks.update(
                        {state:req.body.state},
                        {where:{task_id:req.params.tid,sprint_id:req.params.id,name:req.params.name}})
                        .then(() => {
                            res.send("task modified");
                        }).catch(err=> {res.send(err)})

                }
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/** DELETE: Supprime la tâche*/
// console.log(models.sprints.prototype);
router.delete('/:name/sprints/:id/:tid/' , function(req, res, next) {
    models.project.findById(req.params.name).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            project.getSprints({ where: { sprint_id:req.params.id}}).
            then(sprint =>{
                if(sprint.length==0)
                    res.send("sprint not exist");
                else
                {
                    models.tasks.destroy(
                        {where:{task_id:req.params.tid}})
                        .then(() => {
                            res.send("task deleted");
                        }).catch(err=> {res.send(err)})

                }
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/**GET: renvoie la liste des builds */
router.get('/:id/builds' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            project.getBuilds().
            then(builds =>{
                if(builds.length==0)
                    res.send("project without builds");
                else
                    res.send(builds);
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/**POST: crée un build*/
router.get('/:id/builds/' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            models.builds.create({describle:req.body.describle,name:req.params.id}).
            then(ress=>{
                res.send("build created");
            }).catch(error=>{res.send(error)})
        }
    }).catch(err=> {res.send(err)})
});

module.exports = router;
