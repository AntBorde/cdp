"use strict";
module.exports = function(sequelize, DataTypes) {
    const tasks = sequelize.define("tasks", {
            task_id:
                {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
            description:
                {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
            user_id:
                {
                    type: DataTypes.INTEGER
                },
            state:
                {
                    type: DataTypes.STRING(10),
                    allowNull: false
                },
            cost:
                {
                    type: DataTypes.INTEGER
                },
            project_id:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
            sprint_id:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
        }, {
            timestamps: false,
            freezeTableName: true,
            tableName: 'Task',
        }
    );
    tasks.associate = function(models) {
        tasks.belongsTo(models.projects, {foreignKey : 'project_id'});
        tasks.belongsTo(models.users,{foreignKey : 'user_id'});
        tasks.belongsTo(models.sprints,{foreignKey : 'sprint_id'});
    }


    return tasks;
};
