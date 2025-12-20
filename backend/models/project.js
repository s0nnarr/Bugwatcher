'use strict';
import { Model } from 'sequelize';


export default (sequelize, DataTypes) => {
  class Project extends Model {
  

    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.UserProject,
        foreignKey: 'projectId',
        otherKey: 'userId'
      })
      this.hasMany(models.Bug, {
        foreignKey: 'projectId',
        as: 'bugs'
      })
    }
  }
  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    commit_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};