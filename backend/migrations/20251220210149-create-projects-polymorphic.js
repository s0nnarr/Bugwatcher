'use strict';
/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      owner_id: { // USER/TEAM who owns the project
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      owner_type: {
        type: Sequelize.ENUM("USER", "TEAM"),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: ""  
      },
      commit_link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
}
;