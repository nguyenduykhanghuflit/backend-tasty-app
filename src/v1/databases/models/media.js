'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {
      Media.belongsTo(models.User, {
        foreignKey: 'typeId',
        targetKey: 'userId',
        as: 'UserMedia',
      });
      Media.belongsTo(models.Place, {
        foreignKey: 'typeId',
        targetKey: 'placeId',
        as: 'PlaceMedia',
      });
      Media.belongsTo(models.Post, {
        foreignKey: 'typeId',
        targetKey: 'postId',
        as: 'PostMedia',
      });
    }
  }
  Media.init(
    {
      ImgId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      typeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Media',
    }
  );
  return Media;
};
