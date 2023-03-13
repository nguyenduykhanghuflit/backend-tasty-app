const db = require('../databases/models');
const { Op } = require('sequelize');
class MediaService {
  getMedia(type, typeId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Media.findAll({
          raw: true,
          nest: true,
          where: { type, typeId },
        });
        return resolve({
          msg: response ? 'OK' : 'Media empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
  getAllMedia(type) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Media.findAll({
          raw: true,
          nest: true,
          where: { type },
        });
        return resolve({
          msg: response ? 'OK' : 'Media empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
  createMedia(files) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Media.bulkCreate(files);
        return resolve({
          msg: response ? 'OK' : 'Create failed',
          response: files,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
module.exports = new MediaService();
