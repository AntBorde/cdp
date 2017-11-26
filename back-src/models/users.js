
"use strict";

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    user_id:
    {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    },
    email: 
    {
    type: DataTypes.STRING(255),  
        isEmail: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
    },
    firstname:
    {
    type: DataTypes.STRING(50),
    allowNull: false,
    },
    lastname:
    {
    type: DataTypes.STRING(50),
    allowNull: false
    },
    password:
    {
    type: DataTypes.STRING(60),
    allowNull: false
    },
    birth_date:
    {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    }
 }}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'User'
    }
  );
  return users;
};


