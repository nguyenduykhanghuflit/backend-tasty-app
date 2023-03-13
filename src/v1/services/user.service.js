const db = require('../databases/models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
class UserService {
  //*todo later
  getAllUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.User.findAll({
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.Place,
              as: 'UserPlace',
              plain: true,
              include: [
                {
                  model: db.Media,
                  as: 'PlaceMedia',
                  where: { type: 'place' },
                  plain: true,
                },
              ],
            },
            {
              model: db.Media,
              as: 'UserMedia',
              where: { type: 'avatar' },
              plain: true,
            },
          ],
        });

        return resolve({
          msg: response ? 'OK' : 'User empty',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
  //   phải đi qua midleware login
  //*todo later
  getUserInfo(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.User.findOne({
          raw: false,
          nest: true,
          where: { userId },
          include: [
            {
              model: db.Place,
              as: 'UserPlace',
              plain: true,
            },
            {
              model: db.Media,
              as: 'UserMedia',
              where: { type: 'avatar' },
              plain: true,
            },
          ],
        });
        return resolve({
          msg: response ? 'OK' : 'User invalid',
          response,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  userLogin(info) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, password } = info;
        const response = await db.User.findOne({
          raw: true,
          nest: true,
          where: { username },
        });

        //check username
        if (!response)
          return resolve({
            msg: 'Invalid credentials',
            response,
          });

        //check password
        const isPasswordValid = await bcrypt.compare(
          password,
          response.password
        );

        if (!isPasswordValid) {
          return resolve({
            msg: 'Invalid credentials',
            response,
          });
        }

        const accessToken = jwt.sign(
          { userId: response.userId },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: '20m',
          }
        );

        const refreshToken = jwt.sign(
          { userId: response.userId },
          REFRESH_TOKEN_SECRET
        );

        return resolve({
          msg: 'OK',
          response: { accessToken, refreshToken },
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  userRegister(info) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, password, fullname, email, phone } = info;

        const response = await db.User.findOne({
          raw: true,
          nest: true,
          where: { username },
        });

        if (response)
          return resolve({
            msg: 'Username already exists',
            response,
          });

        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        await db.User.create({
          username,
          password: hashedPassword,
          fullname,
          email,
          phone,
        });

        return resolve({
          msg: 'OK',
          response: { username },
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
module.exports = new UserService();
