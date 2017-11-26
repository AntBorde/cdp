"use strict";
module.exports = function(sequelize, DataTypes) {
  var builds = sequelize.define("builds", {
    build_id:
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
  name:
  {
  type: DataTypes.STRING(125),
  allowNull: false   
  }
},
 {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Build',    
 },
 );
  builds.associate = function(models) {
    builds.belongsTo(models.projects, {foreignKey : 'name'});
  }
  return builds;
};
