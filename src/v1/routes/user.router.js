const app = require('express');
const router = app.Router();
const UserController = require('../controller/user.controller');
const AuthMiddleware = require('../middleware/auth');

router.get('/user/info', AuthMiddleware.Logged, UserController.getUserInfo);
router.post(
  '/user/update',
  AuthMiddleware.Logged,
  UserController.updateUserInfo
);
router.get('/get-all-user', UserController.getAllUser);

module.exports = router;
