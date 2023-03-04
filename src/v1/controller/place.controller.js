const placeService = require('../services/place.service');

class PlaceController {
  async getPlace(req, res) {
    try {
      const data = await placeService.getAllPlace();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        err: true,
        msg: 'Failed at place controller: ' + error,
      });
    }
  }
}
module.exports = new PlaceController();
