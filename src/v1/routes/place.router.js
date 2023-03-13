const app = require('express');
const router = app.Router();
const PlaceController = require('../controller/place.controller');
const AuthMiddleware = require('../middleware/auth');

router.get('/get-all-place', PlaceController.getPlace);
router.post(
  '/create-place',
  AuthMiddleware.Logged,
  PlaceController.createPlace
);

module.exports = router;
