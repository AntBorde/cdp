"use strict";

module.exports = function(sequelize, DataTypes) {
    const project = sequelize.define("project", {
        project_id:
            {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
        name:
            {
                type: DataTypes.STRING(125),
                allowNull: false
            },
        description:
            {
                type: DataTypes.TEXT,
                allowNull: false
            },
        git:
            {
                type: DataTypes.STRING(250),
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );

    project.associate = function(models) {
        project.belongsToMany(models.user, {as: 'contributor',through: 'UserProjects'});
        project.belongsTo(models.user, {as: 'productOwner'});
        project.hasMany(models.issue, {onDelete: 'CASCADE'});
        project.hasMany(models.build, {onDelete: 'CASCADE'});
        project.hasMany(models.sprint, {onDelete: 'CASCADE'});
    };

    return project;
};
