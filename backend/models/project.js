'use strict';
import { Model } from 'sequelize';


export default (sequelize, DataTypes) => {
  class Project extends Model {
  

    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.UserProject,
        as: 'Users',
        foreignKey: 'projectId',
        otherKey: 'userId',
      });
      this.hasMany(models.Bug, {
        foreignKey: 'projectId',
        as: 'bugs'
      });
    }
}
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    commit_link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_type: {
      type: DataTypes.ENUM("USER", "TEAM"),
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};