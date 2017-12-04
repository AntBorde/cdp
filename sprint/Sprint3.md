# Sprint 3

## User stories

| ID us | Stories | Difficulté | Priorité | État |
|-------|:--------|:-----------|:---------|:-----|
|      | **En tant qu'utilisateur**              |
| u0   | je souhaite créer un compte (ID utilisateur, nom, mdp) | 5 | 1 | TODO |
|      | **En tant que développeur**             |
| u1   | je souhaite pourvoir me connecter à mon espace pour pouvoir participer au projet | 2 | 4 | TODO |
| u2   | je souhaite créer/modifier un projet (nom, description, URL du dépot Git et du cahier des charges) | 1 | 1 | TODO |
| u10  | je souhaite avoir accès à une liste de tous les projets afin de choisir les projets auquel je veux participer | 3 | 4 | TODO |
| u12  | je souhaite avoir accès aux listes des US | 3 | 4 | TODO |
| u13  | je souhaite pouvoir ajouter/modifier des issues (en dehors des périodes de sprints) pour m'adapter à l'avancement du projet. | 3 | 2 | TODO |
| u15  | je souhaite avoir accès aux listes des sprints | 3 | 4 | TODO |
| u5   | je veux pouvoir accéder à la liste des URLs de builds | 1 | 4 |TODO|
| sm4  | je souhaite pouvoir ajouter/modifier des tâches (ID, Issue associés, objectif, artefacts, dépendance, coût j/h) à un sprint | 3 | 4 |TODO|
| u14  | je souhaite pouvoir rejoindre un projet en choisissant un rôle (dev, po) | 1 | 4 | TODO|
| sm6  | je souhaite planifier un sprint (début, fin) avec les US qui vont être réalisées pendant ce sprint | 5 | 3 |TODO|
| u8   | je souhaite lister les différents sprints pour voir lesquels sont passés, en cours et à venir | 1 | 4 |TODO|
| dev0 | je peux pouvoir m'assigner à une tâche | 2 | 4 |TODO|

## Tâches

| ID tâche | Issue ID | Objectif | Artefacts | Dev | Dépendance | État |
|----|:--------|:-----------|:---------|:-----|:--------|:------|
| 1 | / | Réaliser la burdown chart du projet | graph | / | / | TODO |
| 2 | u0 | Réaliser le composant (formulaire) angular de la création de compte | ts | / | / | TODO |
| 3 | u0 | Réaliser la route d'inscription - stokage des données utilisateur dans la base & hachage du mot de passe avec bcrypt | ts | / | 1 | TODO |
| 4 | u0 | Réaliser le composant (formulaire) angular de connexion | ts | / | / | TODO |
| 5 | u0 | Réaliser la route de connexion - vérification du mot de passe avec bcrypt et génération d'un token avec express-jwt | js | / | 1 | TODO |
| 6 | u0 | Réaliser la route de rafraîchissement du token (soumission d'un nouveau token au client) | js | / | 5 | TODO |
| 7 | u0 | Réaliser la service de authentification angular - stockage du token dans localstorage & vérification de la validité du token | ts | / | 5, 6 | TODO |
| 8 | u1 | Réaliser la composant angular de la page d'accueil | ts | / | / | TODO |
| 9 | u12, u13 | Réaliser le composant de la page du backlog | ts | / | / | TODO |
| 10 | u10, u2 | Réaliser le composant de la liste les projets | ts | / | / | TODO |
| 11 | u10 | Réaliser le composant de la page de description d'un projet| ts | / | / | TODO |
| 12 | u12 | Réaliser la barre de navigation sur le site pour naviguer entre les différents composantrs | ts | / | 8, 9, 10, 11  | TODO |
| 13 | u10 | Réaliser le gardes des routes angular pour éviter les accès non authorisés aux composants | ts | / | 9, 10, 11 | TODO |
| 14 | u10 | Ajouter les vérifications du token aux routes pour rejeter les requêtes non conformes | ts | / | 6  | TODO |
| 15 | u12,u13 | Réaliser le composant de la liste des Issue d'un projet | ts | / | / | TODO |
| 16 | u15 , sm6 , u8 | Réaliser le composant de la liste des sprint | ts | / | / | TODO |
| 17 | u10, u2 | Réaliser le composant de la liste les projets | ts | / | / | TODO |
| 18 | u14 | Ajouter la gestion des droits en fonction des status de l'utilisateur (PO,DEV)| ts | / | / |TODO|
| 19 | dev0 | Ajouter l'assignation de tache par un dev| ts | / | / |TODO|
| 20 | / | Mettre a jour le docker pour une version plus propre ( a faire a la fin pas la priorité)| yml | / | / |TODO|
