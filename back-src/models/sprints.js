"use strict";
module.exports = function(sequelize, DataTypes) {
    const sprints = sequelize.define("sprints", {
            sprint_id:
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
            dateBegin:
                {
                    type: DataTypes.DATE,
                    allowNull: false
                }
            ,
            dateEnd:
                {
                    type: DataTypes.DATE,
                    allowNull: false
                },
            project_id:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
        }, {
            timestamps: false,
            freezeTableName: true,
            tableName: 'Sprint',
        }
    );
    sprints.associate = function(models) {
        sprints.belongsTo(models.projects, {foreignKey : 'project_id'});
        sprints.hasMany(models.tasks, {foreignKey: 'sprint_id'});

    }


    return sprints;
};
