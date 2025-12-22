'use strict';

import { Model } from 'sequelize';


export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Project, {
        through: models.UserProject,
        foreignKey: 'userId',
        otherKey: 'projectId'
      })
      this.hasMany(models.Bug, {
        foreignKey: 'assignedUserId',
        as: 'assignedBugs'
      })
      this.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'team'
      })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("MP", "TST"),
        allowNull: false,
        defaultValue: "TST"
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Teams',
          key: 'id'
        }
      }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};