'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Project extends Model {
  

    static associate(models) {
      // define association here
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