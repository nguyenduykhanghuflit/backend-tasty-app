const userService = require('../services/user.service');
const mediaService = require('../services/media.service');
const { success, throwError } = require('../utils/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class UserController {
  // get user for dev
  //*todo later
  async getAllUser(req, res, next) {
    try {
      const data = await userService.getAllUser();
      return success(res, 200, data);
    } catch (ex) {
      console.log('lỗi đây ' + ex);
      const msg = 'Failed at getAllUser controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  //*todo later
  async getUserInfo(req, res, next) {
    try {
      const userId = req.userId;
      const data = await userService.getUserInfo(userId);
      // const media = await mediaService.getMedia('avatar', userId);
      // if (media) {
      //   data.response.media = media?.response;
      // }
      return success(res, 200, data);
    } catch (ex) {
      const msg = 'Failed at getUserInfo controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  // get all post of user
  //get all place of user
}
module.exports = new UserController();
