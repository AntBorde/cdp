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
            },
            productOwner:
            {
                type: DataTypes.STRING(125),
                allowNull: false
            }
        }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Project',
    });

    projects.associate = function(models) {
        projects.hasMany(models.issues, {foreignKey: 'project_id',onDelete: 'CASCADE'});
        projects.hasMany(models.project_team, {foreignKey :'project_id',onDelete: 'CASCADE'});
        projects.hasMany(models.builds, {foreignKey :'project_id',onDelete: 'CASCADE'});
        projects.hasMany(models.sprints, {foreignKey :'project_id',onDelete: 'CASCADE'});
    }


    return projects;
};

