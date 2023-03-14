'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      //1 bài viết thuộc về 1 user
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'userId',
        as: 'UserPost',
      });
      //1 bài viết thuộc về 1 địa điểm
      Post.belongsTo(models.Place, {
        foreignKey: 'placeId',
        targetKey: 'placeId',
        as: 'PlacePost',
      });
      //1 bài viết có nhiều hình ảnh
      Post.hasMany(models.Media, {
        foreignKey: 'typeId',
        targetKey: 'postId',
        as: 'PostMedia',
      });
      //1 bài viết có nhiều bình luận
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        targetKey: 'postId',
        as: 'PostComment',
      });
    }
  }
  Post.init(
    {
      postId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      placeId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      star: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      like: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      catalog: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
