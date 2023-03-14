const db = require('../databases/models');
const { Op } = require('sequelize');
class PlaceService {
  getAllPlace() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Place.findAll({
          raw: false, //gộp lại k tách ra
          nest: true,

          include: [
            {
              model: db.User,
              as: 'UserPlace',
              attributes: ['fullname', 'username'],
              plain: true,
            },
            {
              model: db.Media,
              as: 'PlaceMedia',
              where: { type: 'place' },
              plain: true,
            },
          ],
        });
        return resolve({
          msg: response ? 'OK' : 'Place empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  createPlace(info) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Place.create(info);
        return resolve({
          msg: response ? 'OK' : 'Create place failed',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  getPlaceDetail(placeId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Place.findOne({
          raw: false,
          nest: true,
          where: { placeId },
          include: [
            {
              model: db.User,
              as: 'UserPlace',
              attributes: ['fullname', 'username'],
              plain: true,
            },
            {
              model: db.Media,
              as: 'PlaceMedia',
              where: { type: 'place' },
              plain: true,
            },
          ],
        });
        return resolve({
          msg: response ? 'OK' : 'Place invalid',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
  getPlaceByCatalog(category) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Place.findAll({
          raw: false, //gộp lại k tách ra
          nest: true,
          where: { category },
          include: [
            {
              model: db.User,
              as: 'UserPlace',
              attributes: ['fullname', 'username'],
              plain: true,
            },
            {
              model: db.Media,
              as: 'PlaceMedia',
              where: { type: 'place' },
              plain: true,
            },
          ],
        });
        return resolve({
          msg: response ? 'OK' : 'Place empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
module.exports = new PlaceService();
