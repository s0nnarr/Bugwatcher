'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
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