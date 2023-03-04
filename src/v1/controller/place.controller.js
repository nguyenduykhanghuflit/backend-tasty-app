const placeService = require('../services/place.service');

class PlaceController {
  async getPlace(req, res) {
    const data = await placeService.getAllPlace();
    return res.status(200).send(data);
  }
}
module.exports = new PlaceController();
