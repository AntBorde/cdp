let express = require('express');
let router = express.Router();
let cors = require('cors');
var models  = require('../models');
const validator = require('validator');

/*GET: liste des projets*/
router.get('/' ,  cors(),function(req, res) {
    models.projects.findAll().
    then(projects=>{
        if(projects==null)
        res.status(400).send("Aucun projet n'est crée pour le moment ..");
        else
        res.status(200).send(projects);
    }).catch(err=> {res.send(err)})
});

/*POST project */
router.post('/', cors(), function(req, res) {
    models.projects.findOne({where: {name: req.body.name}}).
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
            models.projects.create({
                name:req.body.name,
                description:req.body.description,
                git:req.body.git
            }).
            then(newProject=>{
                let message = "Le projet " +req.body.name + " a été crée";
                res.status(201).jsonp({
                    message: message,
                });
            }).catch(err=> {res.send(err)})
        }
    }).catch(err=> {res.send(err)})
});

/*   GET project infos concernant un projet */
router.get('/:id' , function(req, res, next) {
    models.projects.findById(req.params.id).
    then(project=>{
        if(project==null)
            res.send("project not exist");
        else
            res.send(project);
    }).catch(err=> {res.send(err)})

});

/* GET Users to Project_team =>les utilisateurs associés au projet*/
router.get('/:id/users' , function(req, res, next) {
    models.projects.findById(req.params.id).
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

/* POST add user to the Project_team */
router.post('/:id/users/' , function(req, res, next) {
    if(req.body.status=='p')
    {
        models.project_team.findOne({where: {project_id: req.body.project_id,status:'p'}}).
        then(membre=>{
        if(membre!=null)
        res.status(400).send("Il existe déjà un product owner pour ce projet ");
        else
        {
            models.project_team.create({project_id:req.params.id,user_id:req.body.user_id,status:req.body.status}).
            then(ress=>{
                let message = "Vous êtes le product owner du projet sélectionné";
                res.status(201).jsonp({
                    message: message,
                });
            }).catch(error=>{res.status(400).send(error)})
        }
        }).catch(error=>{res.status(400).send(error)})
      }
        else
        {
            models.project_team.findOne({where: {project_id: req.body.project_id,user_id:req.body.user_id}}).
            then(membreCreate=>{
            if(membreCreate!=null)
            res.status(400).send("Vous êtes déja membre du projet sélectionné");
            else
            {
            models.project_team.create({project_id:req.params.id,user_id:req.body.user_id,status:req.body.status}).
            then(ress=>{
                let message = "Vous participez au projet sélectionné";
                res.status(201).jsonp({
                    message: message,
                });
            }).catch(error=>{res.status(400).send(error)})
           }
           }) 
        }
  });
/* GET Issues to Project (backlog)*/
router.get('/:id/issues' , function(req, res, next) {
    models.projects.findById(req.params.id).
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
    models.projects.findById(req.params.id).
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
    models.projects.findById(req.params.id).
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
    models.projects.findById(req.params.id).
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
    models.projects.findById(req.params.id).
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
    models.projects.findById(req.params.id).
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

    models.projects.findById(req.params.name).
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
})
/**POST: Ajout d'une tâche */
router.post('/:name/sprints/:id' , function(req, res, next) {

    models.projects.findById(req.params.name).
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
})
/** PUT: Modifie le statut de la tâche*/
router.put('/:name/sprints/:id/:tid/' , function(req, res, next) {
    models.projects.findById(req.params.name).
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
})
/** DELETE: Supprime la tâche*/
// console.log(models.sprints.prototype);
router.delete('/:name/sprints/:id/:tid/' , function(req, res, next) {
    models.projects.findById(req.params.name).
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
})
/**GET: renvoie la liste des builds */
router.get('/:id/builds' , function(req, res, next) {
    models.projects.findById(req.params.id).
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
    models.projects.findById(req.params.id).
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
