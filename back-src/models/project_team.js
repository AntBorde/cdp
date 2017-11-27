"use strict";

module.exports = function(sequelize, DataTypes) {
  var project_team = sequelize.define("project_team", {
    name:
    {
    type: DataTypes.STRING(125),
    primaryKey: true,
    allowNull: false
    },
    user_id:
    {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
    },
    status:
    {
    type: DataTypes.STRING(1),
    allowNull: false,
    defaultValue: 'd'
   }
},
 {
        timestamps: false,
        freezeTableName: true,
        tableName: 'project_team',
    });
    project_team.associate = function(models) {
    project_team.belongsTo(models.projects,{foreignKey : 'name'});
     project_team.belongsTo(models.users,{foreignKey : 'user_id'});
    }
  
  return project_team;
};
