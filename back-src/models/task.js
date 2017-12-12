"use strict";
module.exports = function(sequelize, DataTypes) {
    const task = sequelize.define("task", {
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
            state:
                {
                    type: DataTypes.STRING(10),
                    allowNull: false
                },
            cost:
                {
                    type: DataTypes.INTEGER
                }
        },
        {
            timestamps: false
        }
    );
    task.associate = function(models) {
        task.belongsTo(models.project);
        task.belongsTo(models.user);
        task.belongsTo(models.sprint);
    };

    return task;
};
