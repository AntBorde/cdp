"use strict";

module.exports = function(sequelize, DataTypes) {
  var projects = sequelize.define("projects", {
    name:
    {
    type: DataTypes.STRING(125),
    primaryKey: true,
    allowNull: false
    },
    describle: 
    {
    type: DataTypes.TEXT,  
    allowNull: false
    },
    git:
    {
    type: DataTypes.STRING(250),
    allowNull: false  
}}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Project',
    });
    
    projects.associate = function(models) {
      projects.hasMany(models.issues, {foreignKey: 'name',onDelete: 'CASCADE'});
      projects.hasMany(models.project_team, {foreignKey :'name',onDelete: 'CASCADE'});
      projects.hasMany(models.builds, {foreignKey :'name',onDelete: 'CASCADE'});
      projects.hasMany(models.sprints, {foreignKey :'name',onDelete: 'CASCADE'});
      projects.hasMany(models.tasks, {foreignKey :'name',onDelete: 'CASCADE'});
    }
 
  
  return projects;
};
