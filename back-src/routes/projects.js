const express = require('express');
const router = express.Router();
const models  = require('../models');
const jwt = require('jsonwebtoken');
const validator = require('validator');

/*GET: list of projects with their product Owner*/
router.get('/' , function(req, res) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError'){
                res.status(401).send("Votre session a expiré.");
            }
        }
        else {
            models.project.findAll({
                attributes: ['project_id', 'name', 'description', 'git'],
                include: [{
                    model: models.user,
                    as: 'productOwner',
                    attributes: ['firstname', 'lastname']
                }]
                })
                .then(projects => {
                    if(projects.length==0)
                    res.status(404).send("Aucun projet n'est créé pour le moment ..");
                    else{
                    res.status(200).jsonp(projects);
                    }
                }).catch(err=> {res.send(err)})
        }
    })
})

/*POST project with new product owner*/
router.post('/', function(req, res) {
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
        else {
    models.project.findOne({where: {name: req.body.name}}).
    then(project=>{
        if(project !== null){
          return res.status(400).send('Un projet existe déjà avec ce nom.');
        } else {

            if (!validator.isLength(req.body.name, { max: 40 })){
                res.status(400).send('le nom du projet est invalide.');
            }

            if (!validator.isLength(req.body.description, { max: 100})){
                res.status(400).send('La description est trop longue.');
            }

            if (!validator.isLength(req.body.git, { max:30 })){
                res.status(400).send('Le git est trop long.');
            }
            return models.project.create({
                name:req.body.name,
                description:req.body.description,
                git:req.body.git,
                productOwnerUserId:req.body.user_id
            }).then(newProductOwner => {
              res.status(201).jsonp({
                message: "Le projet " +req.body.name + " a été bien crée"
              });
            });
        }
    }).catch(err => res.send(err));
	}
    });
});

/* POST add user to UserProjects */
router.post('/:id/users/' , function(req, res, next) {
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

    models.project.findById(req.params.id).
    then(project=>{
        project.getProductOwner().then(product=>{
        if(product.dataValues.user_id==req.body.user_id)
        res.status(400).send('Vous êtes le product owner du projet '+project.name);
        else
        {
            project.hasContributor(req.body.user_id).then(userMember=>{
                if(userMember)
                {
                 res.status(400).send('Vous participez déja au projet '+project.name);
                }
                else{
                  project.addContributor(req.body.user_id).then(newMember=>{
                     let message = "vous participez au projet "+project.name;
                         res.status(201).jsonp({
                         message: message,
                       });
                     }).catch(err=> {res.send(err)})
                }
                 }).catch(err=> {res.send(err)})
        }
        }).catch(err=> {res.send(err)})
    }).catch(err=> {res.send(err)})
}
})
});

/*Get member to project_team*/
router.get('/:id/users/:iduser' , function(req, res, next) {
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
        models.project.findById(req.params.id).
        then(project=>{
            console.log(models.project.prototype);
        project.getProductOwner().then(product=>{
            if(product.dataValues.user_id!=req.params.iduser)
            {
                project.hasContributor(req.params.iduser).then(userMember=>{
                    if(!userMember)
                    {
                        res.status(404).send("veuillez participer à ce projet pour pouvoir accéder au backlog");
                    }
                    else{
                        res.status(200).jsonp({
                            message:"Ok"
                        });
                    }
                }).catch(err=> {res.send(err)})
        }
        else
        {
            res.status(200).jsonp({
                message:"Ok"
            });
        }
        }).catch(err=> {res.send(err)})
    }).catch(err=> {res.send(err)})
}
});
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

/** PUT: Modifier la tâche*/
router.put('/:id/sprints/:sid/:tid/' , function(req, res, next) {
    jwt.verify(req.headers['authorization'], process.env.AUTH_SECRET, function(err, decoded) {
        if (err && err.name === 'TokenExpiredError'){
          res.status(401).send("Votre session a expiré.");
        } else if (err) {
          res.status(403).send("Identifiants invalides.");
        } else if (!validator.isLength(req.body.description, { min: 10 })) {
          res.status(400).send('description invalide.');
        } else {
            models.task.update(
                {description:req.body.description,state:req.body.state,cost:req.body.cost,userUserId:req.body.dev},
                {where:{task_id:req.params.tid,projectProjectId:req.params.id,}})
                .then(() => {
                    res.status(201).jsonp({
                    message: "Modification effectuée",
                  });
                }).catch(err=> {res.send(err)})
        }
    })
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
