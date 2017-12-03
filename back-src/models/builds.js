"use strict";
module.exports = function(sequelize, DataTypes) {
    const builds = sequelize.define("builds", {
            build_id:
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
            project_id:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
            url:
                {
                    type: DataTypes.STRING(250),
                    allowNull: false
                }
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'Build',
        },
    );
    builds.associate = function(models) {
        builds.belongsTo(models.projects, {foreignKey : 'project_id'});
    }
    return builds;
};
