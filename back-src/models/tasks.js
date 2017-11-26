"use strict";
module.exports = function(sequelize, DataTypes) {
  var tasks = sequelize.define("tasks", {
    task_id:
    {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    },
    describle: 
    {
    type: DataTypes.TEXT,  
    allowNull: false
    },
    user_id:
    {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    state:
    {
    type: DataTypes.STRING(10),
    allowNull: false
    },
    cost:
    {
    type: DataTypes.INTEGER,
    allowNull: false
    },
  name:
  {
  type: DataTypes.STRING(125),
  allowNull: false   
  }
}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Task',    
    }  
  );
  tasks.associate = function(models) {
    tasks.belongsTo(models.projects, {foreignKey : 'name'});
    tasks.belongsTo(models.users,{foreignKey : 'user_id'});
  }
   
    
  return tasks;
};
