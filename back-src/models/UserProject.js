"use strict";
module.exports = function(sequelize, DataTypes) {
    const UserProject = sequelize.define("UserProjects", {

            status:
                {
                    type: DataTypes.STRING(1),
                    allowNull: false
                },
        },
        {
            timestamps: false
        }
    );
    return UserProject;
};
