const app = require('express');
const router = app.Router();
const UserController = require('../controller/user.controller');
const AuthMiddleware = require('../middleware/auth');

router.post(
  '/get-info-user',
  AuthMiddleware.Logged,
  UserController.getUserInfo
);
router.get('/get-all-user', UserController.getAllUser);

module.exports = router;
