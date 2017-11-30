
"use strict";

module.exports = function(sequelize, DataTypes) {
    const users = sequelize.define("users", {
            user_id:
                {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
            email:
                {
                    type: DataTypes.STRING,
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
                    type: DataTypes.CHAR(60),
                    allowNull: false
                }}, {
            timestamps: false,
            freezeTableName: true,
            tableName: 'User'
        }
    );
    return users;
};


