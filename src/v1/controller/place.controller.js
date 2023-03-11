const placeService = require('../services/place.service');
const { success, throwError } = require('../utils/response');

class PlaceController {
  async getPlace(req, res, next) {
    try {
      const data = await placeService.getAllPlace();
      return success(res, 200, data);
    } catch (ex) {
      const msg = 'Failed at place controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  //get place detail + post
  //create place
}
module.exports = new PlaceController();
