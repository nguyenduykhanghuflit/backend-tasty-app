'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('places', {
      placeId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      placeName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      discription: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fullAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lat: {
        allowNull: false,
        defaultValue: 'hardcode',
        type: Sequelize.STRING,
      },
      lng: {
        allowNull: false,
        defaultValue: 'hardcode',
        type: Sequelize.STRING,
      },
      time: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      priceFrom: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      priceTo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('places');
  },
};
