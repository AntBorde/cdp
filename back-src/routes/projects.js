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
        include: [
            { model: models.user}
         ]
    })
    .then(projects => {
        if(projects.length==0)
        {
            res.status(404).send("Aucun projet n'est créé pour le moment ..")
        }
        else
        {
        let promises = [];
        let promise = Promise.resolve();
        promise = promise.then(() => {
        projects.forEach(project => {
            promises.push(project);        
     });
     }).then(() => {
    let ListProjectsProductOwner=[];
     promises.forEach(element => {
        if(element.dataValues.users[0].dataValues.user_id==element.dataValues.productOwnerUserId)
        {
            let ProjectProductOwner={
                name:element.dataValues.name,
                description:element.dataValues.description,
                git:element.dataValues.git,
                productOwner:element.dataValues.users[0].dataValues.lastname
            };
            ListProjectsProductOwner.push(ProjectProductOwner);
        }   
    });
    res.status(200).send(ListProjectsProductOwner);
    })
    }
    }).catch(err=> {res.send(err)})
    }
    })})
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
            res.status(400).send('Un projet existe déjà avec ce nom.');
        }
        else {

            if (!validator.isLength(req.body.name, { max: 40 })){
                res.status(400).send('le nom du projet est invalide.');
            }

            if (!validator.isLength(req.body.description, { max: 100})){
                res.status(400).send('La description est trop longue.');
            }

            if (!validator.isLength(req.body.git, { max:30 })){
                res.status(400).send('Le git est trop long.');
            }
            models.project.create({
                name:req.body.name,
                description:req.body.description,
                git:req.body.git,
                productOwnerUserId:req.body.user_id,
            }).
            then(newProject=>{
                models.UserProjects.create({
                    status:'p',
                    projectProjectId:newProject.project_id,
                    userUserId:req.body.user_id,
                }).
                then(newProductOwner=>{
                    let message = "Le projet " +req.body.name + " a été bien crée";
                    res.status(201).jsonp({
                    message: message,
                  });
                }).catch(err=> {res.send(err)})
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
}
})
});
/*GET project infos concernant un projet */
router.get('/:id' , function(req, res, next) {
    models.project.findById(req.params.id)
        .then(project=>{
            if(project==null)
                res.send("project not exist");
            else
                res.send(project);
        }).catch(err=> {res.send(err)})

});

/* GET Users to Project_team => les utilisateurs associés au projet */
router.get('/:id/users' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            project.getProject_teams().
            then(team =>{
                if(team.length==0)
                    res.send("project without team");
                else
                    res.send(team);
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});
/*Get member to project_team*/
router.get('/:id/users/:iduser' , function(req, res, next) {
    console.log(req.params.id);
    console.log(req.params.iduser);
    
    models.project_team.findOne({where: {project_id:req.params.id,user_id:req.params.iduser}}).
            then(membre =>{
                console.log(membre);
                if(membre ==null)
                res.status(404).send("veuillez participer à ce projet pour pouvoir accéder au backlog");
                else
                res.status(200).jsonp({
                    message:"Ok"
                });
            }).catch(err=> {res.send(err)})
});

/* POST add user to the Project_team */
router.post('/:id/users/' , function(req, res, next) {
    models.project_team.findOne({where: {project_id: req.body.project_id,user_id:req.body.user_id}}).
    then(membreCreate=>{
        if(membreCreate!=null)
            res.status(400).send("Vous êtes déja membre du projet sélectionné");
        else
        {
            models.project_team.create({project_id:req.params.id,user_id:req.body.user_id,status:'d'}).
            then(ress=>{
                let message = "Vous participez au projet sélectionné";
                res.status(201).jsonp({
                    message: message,
                });
            }).catch(error=>{res.status(400).send(error)})
        }
    })
});

/* GET Issues to Project (backlog)*/
router.get('/:id/issues' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            project.getIssues().
            then(Issues =>{
                if(Issues.length==0)
                    res.send("project without Issues");
                else
                    res.send(Issues);
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/* GET Issue by id */
router.get('/:id/issues/:issue' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            project.getIssues({ where: { issue_id:req.params.issue}}).
            then(Issue =>{
                if(Issue.length==0)
                    res.send("issue not found");
                else
                    res.send(Issue);
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/* POST Issue to project */
router.post('/:id/issues/' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            models.issues.create({storie:req.body.storie,difficulty:req.body.difficulty,priority:req.body.priority,state:req.body.state,name:req.params.id}).
            then(ress=>{
                res.send("issue affected to project");
            }).catch(error=>{res.send("issue already affected to project"+error)})
        }
    }).catch(err=> {res.send(err)})
});

/* PUT Issue */
router.put('/:id/issues/:issue' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            project.getIssues({ where: { issue_id:req.params.issue}}).
            then(Issue =>{
                if(Issue.length==0)
                    res.send("issue not found");
                else
                {
                    models.issues.update(
                        {storie:req.body.stories,difficulty:req.body.difficulty,priority:req.body.priority,state:req.body.state},
                        {where:{issue_id:req.params.issue}})
                        .then(() => {
                            res.send("issue modified");
                        }).catch(err=> {res.send(err)})
                }
            }).catch(error=> {res.send(error)})}
    }).catch(err=> {res.send(err)})
});

/* GET Sprints to project*/
router.get('/:id/sprints' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            project.getSprints().
            then(Sprints =>{
                if(Sprints.length==0)
                    res.send("project without Sprints");
                else
                    res.send(Sprints);
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/** POST sprint to project */
router.post('/:id/sprints/' , function(req, res, next) {
    models.project.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
        {
            models.sprints.create({describle:req.body.describle,dateBegin:req.body.dateBegin,dateEnd:req.body.dateEnd,name:req.params.id}).
            then(ress=>{
                res.send("sprint affected to project");
            }).catch(error=>{res.send(error)})
        }
    }).catch(err=> {res.send(err)})
});

/** GET tâches :renvoie la listes des tâches associées à un sprint */
router.get('/:name/sprints/:id' , function(req, res, next) {

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
                    sprint[0].getTasks().then(tasks =>{
                        res.send(tasks);
                    })
                }
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/**POST: Ajout d'une tâche */
router.post('/:name/sprints/:id' , function(req, res, next) {

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
                    models.tasks.create({describle:req.body.describle,user_id:req.body.user_id,state:req.body.state,cost:req.body.cost,name:req.params.name,sprint_id:req.params.id}).
                    then(ress=>{
                        res.send("task created");
                    }).catch(error=>{res.send(error)})
                }
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
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
