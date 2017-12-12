"use strict";
module.exports = function(sequelize, DataTypes) {
    const sprint = sequelize.define("sprint", {
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
                
        },
        {
            timestamps: false
        }
    );

    sprint.associate = function(models) {
        sprint.belongsTo(models.project);
        sprint.hasMany(models.task);
    };

    return sprint;
};
