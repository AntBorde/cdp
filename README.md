# Installation & Exécution

*Prérequis: Docker et Docker-Compose*

Attention: le container de mongodb est incompatible avec Windows

 * Installer la dernière version docker-ce selon les instructions du site : https://docs.docker.com/engine/installation/
 * Installer la dernière version de docker-compose selon les instructions du site : https://docs.docker.com/compose/install/
 
Ajoutez votre utilisateur local au groupe Docker selon les instructions du site : https://docs.docker.com/engine/installation/linux/linux-postinstall/

Pour lancer le site :
* Naviguez dans le dossier web
* *docker-compose up* pour lancer les conteneurs
* *docker-compose restart* pour relancer les conteneurs
* *docker-compose down* pour éteindre les conteneurs
* *docker-compose build* pour reconstruire les images, nécessaire si package.json a changé

Le site est accessible sur *localhost:3000*

# User stories

| ID us | Stories | Difficulté | Priorité | État |
|-------|:--------|:-----------|:---------|:-----|
|      | **En tant qu'utilisateur**              |
| u0   | je souhaite créer un compte (ID utilisateur, nom, mdp) |5 | 1 |TODO|
|      | **En tant que développeur**             |
| u1   | je souhaite pourvoir me connecter à mon espace pour pouvoir participer au projet | 2 | 4|TODO|
| u2   | je souhaite créer/modifier un projet (nom, description, URL du dépot Git et du cahier des charges) | 1 | 1 |TODO|
| u10  | je souhaite avoir accès à une liste de tous les projets afin de choisir les projets auquel je veux participer | 3 | 4 | TODO |
| u14  | je souhaite pouvoir rejoindre un projet en choisissant un rôle (dev, po) | 1 | 4 | TODO|
| u12  | je souhaite avoir accès aux listes des US et des Sprints | 3 | 4 | TODO |
| u5   | je veux pouvoir accéder à la liste des URLs de builds | 1 | 4 |TODO|
| u13  | je souhaite pouvoir ajouter/modifier des issues (en dehors des périodes de sprints) pour m'adapter à l'avancement du projet. | 3 | 2 |TODO|
| sm6  | je souhaite planifier un sprint (début, fin) avec les US qui vont être réalisées pendant ce sprint | 5 | 3 |TODO|
| u8   | je souhaite lister les différents sprints pour voir lesquels sont passés, en cours et à venir | 1 | 4 |TODO|
| sm4  | je souhaite pouvoir ajouter/modifier des tâches (ID, Issue associés, objectif, artefacts, dépendance, coût j/h) à un sprint | 3 | 4 |TODO|
| u4   | je souhaite voir l'avancement des tâches d'un sprint au moyen d'un Kanban | 3 | 4 |TODO|
| dev0 | je peux pouvoir m'assigner à une tâche | 2 | 4 |TODO|
| dev1 | je veux pouvoir changer l'état d'une tâche (TODO, DONE) et que cela mette à jour le Kanban | 3 | 4 |TODO|
| sm7  | je voudrais valider les US qui ont été faite pendant un sprint et que cela apparaisse dans le backlog | 2 | 4 |TODO|
| dev2 | A la fin d'un sprint je veux pouvoir associer le sprint à une URL de build pour rendre le travail visible au product owner | 2 | 4 |TODO|
|      | **En tant que product owner**           |
| po0  | je souhaite pourvoir définir/modifier des priorités sur les issues en dehors des périodes de sprints | 2 | 4 |TODO|