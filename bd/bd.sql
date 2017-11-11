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
    birth_date    date            not null,
    primary key(user_id)
  );


  -- =================================================================
  --      table : Project
  -- =================================================================
create table if not exists Project
  (
    project_id    integer         not null        auto_increment,
    name          varchar(125)    not null,
    describle     Text,
    git           varchar(250),
    primary key(project_id)
  );


  -- =================================================================
  --      table : Project
  -- =================================================================
create table if not exists Project_team
  (
    project_id    integer         not null,
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
    storie        text            not null,
    difficulty    smallint        not null,
    priority      smallint        not null,
    state         varchar(10)     not null,
    project_id    integer         not null,
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
