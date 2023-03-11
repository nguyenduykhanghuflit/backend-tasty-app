const userService = require('../services/user.service');
const { success, throwError } = require('../utils/response');
const bcrypt = require('bcryptjs');
class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        const msg = 'Invalid credentials';
        return throwError(msg, 400, next);
      }

      const data = await userService.userLogin({ username, password });
      if (data.msg !== 'OK' || !data.response) {
        const msg = 'Invalid credentials';
        return throwError(msg, 400, next);
      }

      return success(res, 200, data);
    } catch (ex) {
      const msg = 'Failed at user login controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  async resgiter(req, res, next) {
    try {
      const { username, password, fullname, email, phone } = req.body;

      //chưa validate email và phone

      if (!username || !password || !fullname || !phone) {
        const msg = 'Invalid info';
        return throwError(msg, 400, next);
      }

      const data = await userService.userRegister(req.body);
      if (data.msg !== 'OK' || !data.response) {
        return throwError(data.msg, 400, next);
      }

      return success(res, 200, data);
    } catch (ex) {
      const msg = 'Failed at user resgiter controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }
}
module.exports = new AuthController();
