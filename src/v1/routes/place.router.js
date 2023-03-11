const app = require('express');
const router = app.Router();
const PlaceController = require('../controller/place.controller');

router.get('/get-all-place', PlaceController.getPlace);

module.exports = router;
