'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      Place.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'userId',
        as: 'UserPlace',
      });
      Place.hasMany(models.Media, {
        foreignKey: 'typeId',
        targetKey: 'placeId',
        as: 'PlaceMedia',
      });
    }
  }
  Place.init(
    {
      placeId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      placeName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      discription: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fullAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lat: {
        allowNull: false,
        defaultValue: 'hardcode',
        type: DataTypes.STRING,
      },
      lng: {
        allowNull: false,
        defaultValue: 'hardcode',
        type: DataTypes.STRING,
      },
      time: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      priceFrom: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      priceTo: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Place',
    }
  );
  return Place;
};
