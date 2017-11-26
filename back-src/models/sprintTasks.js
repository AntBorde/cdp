"use strict";
module.exports = function(sequelize, DataTypes) {
  var sprintTasks = sequelize.define("sprintTasks", {
    sprintTask_id:
    {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    },
    task_id:
    {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    sprint_id:
    {
    type: DataTypes.INTEGER,
    allowNull: false
    }
}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'SprintTask',    
    }  
  );
  sprintTasks.associate = function(models) {
    sprintTasks.belongsTo(models.sprints, {foreignKey : 'sprint_id'});
    sprintTasks.belongsTo(models.tasks,{foreignKey : 'task_id'});
  }
   
  return sprintTasks;
};
