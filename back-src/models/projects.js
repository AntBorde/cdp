"use strict";

module.exports = function(sequelize, DataTypes) {
    const projects = sequelize.define("projects", {
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
            }}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Project',
    });

    projects.associate = function(models) {
        projects.hasMany(models.issues, {foreignKey: 'name',onDelete: 'CASCADE'});
        projects.hasMany(models.project_team, {foreignKey :'name',onDelete: 'CASCADE'});
        projects.hasMany(models.builds, {foreignKey :'name',onDelete: 'CASCADE'});
        projects.hasMany(models.sprints, {foreignKey :'name',onDelete: 'CASCADE'});
    }


    return projects;
};
