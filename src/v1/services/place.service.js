const db = require('../databases/models');
const { Op } = require('sequelize');
class PlaceService {
  getAllPlace() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Place.findAll({
          raw: true,
          nest: true,
          include: [
            {
              model: db.User,
              as: 'user',
              attributes: ['fullname', 'username'],
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
