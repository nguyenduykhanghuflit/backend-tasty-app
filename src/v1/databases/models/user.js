'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Place, { foreignKey: 'userId', as: 'UserPlace' });
      User.hasMany(models.Media, {
        foreignKey: 'typeId',
        targetKey: 'userId',
        as: 'UserMedia',
      });
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        targetKey: 'userId',
        as: 'UserPost',
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        targetKey: 'userId',
        as: 'UserComment',
      });
    }
  }
  User.init(
    {
      userId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fullname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
