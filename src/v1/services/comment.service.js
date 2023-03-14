const db = require('../databases/models');
const { Op } = require('sequelize');

class CommentService {
  getComment(postId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Comment.findAll({
          raw: false,
          nest: true,
          where: { postId },
          include: [
            {
              model: db.User,
              as: 'UserComment',
              plain: true,
              attributes: ['fullname', 'username'],
              include: [
                {
                  model: db.Media,
                  as: 'UserMedia',
                  attributes: ['url'],
                  where: { type: 'avatar' },
                  plain: true,
                },
              ],
            },
          ],
        });
        return resolve({
          msg: response ? 'OK' : 'Comment empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  createComment(info) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Comment.create(info);
        return resolve({
          msg: 'OK',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
module.exports = new CommentService();
