'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {

    static associate(models) {
      // define association here
    }
  }
  UserProject.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProject',
  });
  return UserProject;
};