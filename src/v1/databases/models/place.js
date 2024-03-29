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
      Place.hasMany(models.Post, {
        foreignKey: 'placeId',
        targetKey: 'placeId',
        as: 'PlacePost',
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
      description: {
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
      timeFrom: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      timeTo: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
        defaultValue: 'eat and drink',
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
