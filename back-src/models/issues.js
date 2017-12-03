"use strict";
module.exports = function(sequelize, DataTypes) {
    const issues = sequelize.define("issues", {
            issue_id:
                {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
            storie:
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
                },
            name:
                {
                    type: DataTypes.STRING(125),
                    allowNull: false
                }
        }, {
            timestamps: false,
            freezeTableName: true,
            tableName: 'Issue',
        }
    );
    issues.associate = function(models) {
        issues.belongsTo(models.projects, {foreignKey : 'name'});
    }


    return issues;
};
