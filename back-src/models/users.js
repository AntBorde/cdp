
"use strict";

module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define("user", {
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
                    allowNull: false,
                    unique: true,
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
                }
        }
    );

    user.associate = function(models) {
        user.belongsToMany(models.project, {through : models.project_team});
    };
    return user;
};


