const { throwError } = require('../utils/response');
const { ACCESS_TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken');
class AuthMiddleware {
  async Logged(req, res, next) {
    try {
      const accesstoken = req.headers?.authorization?.split(' ')[1];
      if (!accesstoken) return throwError('Token invalid', 401, next);
      const decodedToken = jwt.verify(accesstoken, ACCESS_TOKEN_SECRET);
      req.userId = decodedToken.userId;
      next();
    } catch (ex) {
      const msg = 'Unauthorized: ' + ex;
      return throwError(msg, 401, next);
    }
  }
}
module.exports = new AuthMiddleware();
