"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Bugs', 'reporterId', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Bugs', 'reporterId');
}
