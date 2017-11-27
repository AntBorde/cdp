"use strict";
module.exports = function(sequelize, DataTypes) {
  var sprints = sequelize.define("sprints", {
    sprint_id:
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
    dateBegin:
    {
   type: DataTypes.DATE,    
    allowNull: false
    }
   ,
   dateEnd:
   {
   type: DataTypes.DATE,   
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
        tableName: 'Sprint',    
    }  
  );
  sprints.associate = function(models) {
    sprints.belongsTo(models.projects, {foreignKey : 'name'});
    sprints.hasMany(models.tasks, {foreignKey: 'sprint_id'});
    
  }
   
    
  return sprints;
};
