-- =================================================================
--      Création de la base de données du site
-- =================================================================
create database if not exists cdp;
use cdp;


-- =================================================================
--      table : User
-- =================================================================
create table if not exists User
  (
    user_id       integer         not null        auto_increment,
    pseudo        varchar(50)     not null,
    name          varchar(50)     not null,
    first_name    varchar(50)     not null,
    birth_date    date,
    primary key(user_id)
  );


  -- =================================================================
  --      table : Project
  -- =================================================================
create table if not exists Project
  (
    name          varchar(125)    not null,
    describle     Text,
    git           varchar(250),
    primary key(name)
  );


  -- =================================================================
  --      table : Project
  -- =================================================================
create table if not exists Project_team
  (
    project_id    varchar(125)    not null,
    user_id       integer         not null,
    status        char(1)         not null         default 'd',
    primary key (project_id,user_id)
  );


  -- =================================================================
  --      table : Issue
  -- =================================================================
create table if not exists Issue
  (
    issue_id      integer         not null        auto_increment,
    storie        text,
    difficulty    smallint,
    priority      smallint,
    state         varchar(10),
    project_id    varchar(125)    not null,
    primary key (issue_id)
  );


  -- =================================================================
  --      table : Tache
  -- =================================================================


  -- =================================================================
  --      table : Sprint
  -- =================================================================


  -- =================================================================
  --      table : Build
  -- =================================================================



  -- =================================================================
  -- =================================================================
  --      Ajout de données
  -- =================================================================
  -- =================================================================
insert into User (pseudo,name,first_name)
  values
  ('shervin','sarain','shervin'),
  ('mthl','lirzin','mathieu'),
  ('younes','gadi','younes'),
  ('capsy','borde','antoine');

insert into Project (name,describle)
  values
  ('web','projet de web ou nous devons faire notre projet blablabla'),
  ('cdp','projet de cdp ou nous devons correctement gérer le dévellopement d\'un projet de maniere pro');


insert into Project_team (project_id,user_id,status)
  values
  ('web',1,'d'),
  ('web',2,'d'),
  ('cdp',3,'d'),
  ('cdp',4,'d');

insert into Issue (storie,difficulty,priority,state,project_id)
  values
  ('je veux voir le backlog',2,2,'TODO','web'),
  ('je veux voir les taches',2,2,'TODO','web'),
  ('je veux une belle view',2,2,'TODO','cdp'),
  ('je veux la présence d\'une bd',2,2,'TODO','cdp');
