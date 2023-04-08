const app = require('express');
const router = app.Router();
const PlaceController = require('../controller/place.controller');
const AuthMiddleware = require('../middleware/auth');
const uploadImages = require('../middleware/uploadImage');
const { uploadCloundinary } = require('../middleware/uploadCloundinary');
router.get('/place', PlaceController.getPlace);
router.post(
  '/place',
  AuthMiddleware.Logged,
  uploadCloundinary,
  PlaceController.createPlace
);

module.exports = router;
