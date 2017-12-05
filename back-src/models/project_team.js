"use strict";

module.exports = function(sequelize, DataTypes) {
    const project_team = sequelize.define("project_team", {
            status:
                {
                    type: DataTypes.STRING(1),
                    allowNull: false,
                    defaultValue: 'd'
                }
        }
    );

    project_team.associate = function(models) {
        project_team.belongsTo(models.project);
        project_team.belongsTo(models.user);
    };

    return project_team;
};

