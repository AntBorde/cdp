"use strict";
module.exports = function(sequelize, DataTypes) {
    const build = sequelize.define("build", {
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
            url:
                {
                    type: DataTypes.STRING(250),
                    allowNull: false,
                    validate: {
                        isURL: true
                    }
                }
        },
        {
            timestamps: false
        }
    );

    build.associate = function(models) {
        build.belongsTo(models.project);
    };

    return build;
};
