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


Pour lancer les tests:
* *npm install -g protractor* pour installer protractor
* *sudo webdriver-manager update* mettre a jour selenium
* *webdriver-manager start* pour lancer selenium
* *protractor protractorConf.js* pour lancer les tests

# User stories

| ID us | Stories | Difficulté | Priorité | État |
|-------|:--------|:-----------|:---------|:-----|
|      | **En tant qu'utilisateur**              |
| u0   | je souhaite créer un compte (ID utilisateur, nom, mdp) |5 | 1 |DONE|
|      | **En tant que développeur**             |
| u1   | je souhaite pourvoir me connecter à mon espace pour pouvoir participer au projet | 2 | 4|DONE|
| u2   | je souhaite créer/modifier un projet (nom, description, URL du dépot Git et du cahier des charges) | 1 | 1 |DONE|
| u10  | je souhaite avoir accès à une liste de tous les projets afin de choisir les projets auquel je veux participer | 3 | 4 | DONE |
| u14  | je souhaite pouvoir rejoindre un projet en choisissant un rôle (dev, po) | 1 | 4 | DONE|
| u12  | je souhaite avoir accès aux listes des US | 3 | 4 | DONE |
| u15  | je souhaite avoir accès aux listes des sprints | 3 | 4 | DONE |
| u5   | je veux pouvoir accéder à la liste des URLs de builds | 1 | 4 |TODO|
| u13  | je souhaite pouvoir ajouter/modifier des issues (en dehors des périodes de sprints) pour m'adapter à l'avancement du projet. | 3 | 2 |DONE|
| sm6  | je souhaite planifier un sprint (début, fin) avec les US qui vont être réalisées pendant ce sprint | 5 | 3 |DONE|
| u8   | je souhaite lister les différents sprints pour voir lesquels sont passés, en cours et à venir | 1 | 4 |DONE|
| sm4  | je souhaite pouvoir ajouter/modifier des tâches (ID, Issue associés, objectif, artefacts, dépendance, coût j/h) à un sprint | 3 | 4 |DONE|
| dev0 | je peux pouvoir m'assigner à une tâche | 2 | 4 |DONE|
| u4   | je veux pouvoir changer l'état d'une tâche (TODO, DONE) et que cela mette à jour dans un Kanban | 3 | 4 |DONE|
| sm7  | je voudrais valider les US qui ont été faite pendant un sprint et que cela apparaisse dans le backlog | 2 | 4 |TODO|
| dev2 | A la fin d'un sprint je veux pouvoir associer le sprint à une URL de build pour rendre le travail visible au product owner | 2 | 4 |TODO|
|      | **En tant que product owner**           |
| po0  | je souhaite pourvoir définir/modifier des priorités sur les issues en dehors des périodes de sprints | 2 | 4 |TODO|
