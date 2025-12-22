'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'teamId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }

export async function down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'teamId');
}
