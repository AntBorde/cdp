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
    user_id       integer       not null        auto_increment,
    email         varchar(255)  not null,
    firstname     varchar(50)   not null,
    lastname      varchar(50)   not null,
    password      CHAR(60)      not null,
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
  --      table : Project_Team
  -- =================================================================
create table if not exists Project_team
  (
    name          varchar(125)    not null,
    user_id       integer         not null,
    status        char(1)         not null         default 'd',
    primary key (name,user_id),
    constraint project_member
          foreign key (name)
          references Project(name)
          ON DELETE CASCADE,
    constraint member
          foreign key (user_id)
          references User(user_id)
          ON DELETE CASCADE
  );


  -- =================================================================
  --      table : Issue
  -- =================================================================
create table if not exists Issue
  (
    issue_id      integer         not null        auto_increment,
    storie        text            not null,
    difficulty    smallint        not null,
    priority      smallint        not null,
    state         varchar(10)     not null,
    name          varchar(125)    not null,
    primary key (issue_id),
    constraint project_issue
          foreign key (name)
          references Project(name)
          ON DELETE CASCADE
  );

  -- =================================================================
  --      table : Sprint
  -- =================================================================
  create table if not exists Sprint
    (
      sprint_id     integer        not null       auto_increment,
      describle     Text,
      dateBegin     Date,
      dateEnd       Date,
      name          varchar(125)    not null,
      primary key (sprint_id),
      constraint project_sprint
            foreign key (name)
            references Project(name) ON DELETE CASCADE
    );
       -- =================================================================
  --      table : Tache
  -- =================================================================
create table if not exists Task
  (
    task_id       integer        not null       auto_increment,
    describle     Text           not null,
    user_id       integer,
    state         varchar(10)    not null,
    cost          integer,
    name          varchar(125)    not null,
    sprint_id     integer        not null ,
    primary key (task_id),
    constraint project_task
          foreign key (name)
          references Project(name) 
           ON DELETE CASCADE,
    constraint user_task
          foreign key (user_id)
          references User(user_id),
    constraint sprint_task
          foreign key (sprint_id)
          references Sprint(sprint_id) ON DELETE CASCADE 
  );

 -- =================================================================
  --      table : Build
  -- =================================================================
  create table if not exists Build
    (
      build_id     integer        not null       auto_increment,
      describle    Text,
      name         varchar(125)   not null,
      primary key (build_id),
      constraint project_build
            foreign key (name)
            references Project(name) ON DELETE CASCADE
    );
  -- =================================================================
    -- =================================================================
    --      Ajout de données
    -- =================================================================
    -- =================================================================
--  insert into User (firstname,lastname,email)
--    values
--    ('shervin','shervin','foo@bar.baz'),
--    ('mthl','mthl','foo@bar.baz'),
--    ('younes','younes','foo@bar.baz'),
--    ('capsy','capsy','foo@bar.baz');
--
--  insert into Project (name,describle)
--    values
--    ('web','projet de web ou nous devons faire notre projet blablabla'),
--    ('cdp','projet de cdp ou nous devons correctement gérer le dévellopement d\'un projet de maniere pro');
--
--
--  insert into Project_team (name,user_id,status)
--    values
--    ('web',1,'d'),
--    ('web',2,'d'),
--    ('cdp',3,'d'),
--    ('cdp',4,'d');
--
--  insert into Issue (storie,difficulty,priority,state,name)
--    values
--    ('je veux voir le backlog',2,2,'TODO','web'),
--    ('je veux voir les taches',2,2,'TODO','web'),
--    ('je veux une belle view',2,2,'TODO','cdp'),
--    ('je veux la présence d\'une bd',2,2,'TODO','cdp');
--
--  insert into Sprint (describle,name)
--    values
--    ('arrivé a faire tout ça','web'),
--    ('arrivé a faire tout ça','cdp');
--
--   insert into Task (describle,user_id,state,name,sprint_id)
--    values
--    ('faire un truc',1,'TODO','web',1),
--    ('faire un autre truc',2,'TODO','web',1),
--    ('faire la doc',3,'TODO','cdp',2),
--    ('faire les builds',4,'TODO','cdp',2);
