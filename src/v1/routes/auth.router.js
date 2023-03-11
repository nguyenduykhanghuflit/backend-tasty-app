const app = require('express');
const router = app.Router();
const AuthController = require('../controller/auth.controller');

//*todo later
router.post('/user-login', AuthController.login);
router.post('/user-register', AuthController.resgiter);

module.exports = router;
