'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {}
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
