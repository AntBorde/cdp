"use strict";
module.exports = function(sequelize, DataTypes) {
    const issue = sequelize.define("issue", {
            issue_id:
                {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
            story:
                {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
            difficulty:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            ,
            priority:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            ,
            state:
                {
                    type: DataTypes.STRING(10),
                    allowNull: false
                }
                
        },
        {
            timestamps: false
        }
    );

    issue.associate = function(models) {
        issue.belongsTo(models.project);
    };

    return issue;
};
