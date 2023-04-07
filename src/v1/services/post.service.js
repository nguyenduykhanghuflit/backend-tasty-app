const db = require('../databases/models');
const { Op, Sequelize } = require('sequelize');

class PostService {
  getAllPost() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Post.findAll({
          raw: false, //gộp lại k tách ra
          nest: true,

          include: [
            //lấy user
            {
              model: db.User,
              as: 'UserPost',
              attributes: ['fullname', 'username'],
              plain: true,
              include: [
                {
                  model: db.Media,
                  as: 'UserMedia',
                  where: { type: 'avatar' },
                  attributes: ['url'],
                  plain: true,
                },
              ],
            },
            //lấy media
            {
              model: db.Media,
              as: 'PostMedia',
              where: { type: 'post' },
              plain: true,
              attributes: ['url'],
            },
            //lấy place
            {
              model: db.Place,
              as: 'PlacePost',
              plain: true,
              include: [
                {
                  model: db.Media,
                  as: 'PlaceMedia',
                  attributes: ['url'],
                  where: { type: 'place' },
                  plain: true,
                },
              ],
            },
          ],
        });
        return resolve({
          msg: response ? 'OK' : 'Post empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  getPostDetail(postId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Post.findOne({
          raw: false, //gộp lại k tách ra
          nest: true,
          where: { postId },
          include: [
            //lấy user
            {
              model: db.User,
              as: 'UserPost',
              attributes: ['fullname', 'username'],
              plain: true,
              include: [
                {
                  model: db.Media,
                  as: 'UserMedia',
                  where: { type: 'avatar' },
                  attributes: ['url'],
                  plain: true,
                },
              ],
            },
            //lấy media
            {
              model: db.Media,
              as: 'PostMedia',
              where: { type: 'post' },
              plain: true,
              attributes: ['url'],
            },
            //lấy place
            {
              model: db.Place,
              as: 'PlacePost',
              plain: true,
              include: [
                {
                  model: db.Media,
                  as: 'PlaceMedia',
                  attributes: ['url'],
                  where: { type: 'place' },
                  plain: true,
                },
              ],
            },
          ],
        });
        return resolve({
          msg: response ? 'OK' : 'Post empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  getPostByCatalog(catalog) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Post.findAll({
          raw: false, //gộp lại k tách ra
          nest: true,
          where: Sequelize.where(
            Sequelize.fn(
              'JSON_CONTAINS',
              Sequelize.col('catalog'),
              JSON.stringify(catalog)
            ),
            true
          ),
          include: [
            //lấy user
            {
              model: db.User,
              as: 'UserPost',
              attributes: ['fullname', 'username'],
              plain: true,
              include: [
                {
                  model: db.Media,
                  as: 'UserMedia',
                  where: { type: 'avatar' },
                  attributes: ['url'],
                  plain: true,
                },
              ],
            },
            //lấy media
            {
              model: db.Media,
              as: 'PostMedia',
              where: { type: 'post' },
              plain: true,
              attributes: ['url'],
            },
            //lấy place
            {
              model: db.Place,
              as: 'PlacePost',
              plain: true,
              include: [
                {
                  model: db.Media,
                  as: 'PlaceMedia',
                  attributes: ['url'],
                  where: { type: 'place' },
                  plain: true,
                },
              ],
            },
          ],
        });
        return resolve({
          msg: response ? 'OK' : 'Post empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  createPost(info) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Post.create(info);
        return resolve({
          msg: response ? 'OK' : 'Create post failed',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
module.exports = new PostService();
