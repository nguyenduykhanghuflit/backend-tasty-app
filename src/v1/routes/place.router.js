const app = require('express');
const router = app.Router();
const PlaceController = require('../controller/place.controller');
const AuthMiddleware = require('../middleware/auth');

router.get('/place', PlaceController.getPlace);
router.post('/place', AuthMiddleware.Logged, PlaceController.createPlace);

module.exports = router;
