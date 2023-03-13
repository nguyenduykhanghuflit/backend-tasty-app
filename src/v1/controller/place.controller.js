const placeService = require('../services/place.service');
const mediaService = require('../services/media.service');
const { success, throwError } = require('../utils/response');
const { MEDIA_TYPE } = require('../utils/const');
const { upload } = require('../utils/upload');
const multer = require('multer');
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
  //* Fix sau: Create place trước sau đó mới upload hình ảnh
  async createPlace(req, res, next) {
    try {
      const userId = req.userId;
      if (!userId) return throwError('Unauthorized', 401, next);

      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError || err) {
          return throwError(`Upload fail: ${err}`, 500, next);
        }

        const info = req.body;
        const requiredFields = [
          'placeName',
          'description',
          'fullAddress',
          'lat',
          'lng',
          'time',
          'priceFrom',
          'priceTo',
          'phone',
          'category',
        ];
        const missingFields = requiredFields.filter((field) => !info[field]);
        if (missingFields.length > 0) {
          return throwError(
            `Missing data: ${missingFields.toString()}`,
            400,
            next
          );
        }

        const { response, msg } = await placeService.createPlace({
          ...info,
          userId,
        });
        if (msg !== 'OK' || !response) {
          return throwError('Can not create place', 500, next);
        }

        const placeRes = response;
        const files = req.files.filter((file) =>
          file.mimetype.startsWith('image/')
        );
        if (files.length <= 0) {
          return throwError('Missing or invalid media', 400, next);
        }

        const mediaData = await mediaService.createMedia(
          files.map((file) => ({
            url: `/static/${file.filename}`,
            type: MEDIA_TYPE.place,
            typeId: placeRes.placeId || 'Lỗi',
          }))
        );

        const mediaRes = mediaData?.response?.map((item) => item.dataValues);
        if (!mediaRes?.length) {
          return throwError('Can not create media', 500, next);
        }

        return success(res, 200, {
          place: { ...placeRes, media: mediaRes },
        });
      });
    } catch (error) {
      const msg = 'Failed at create place controller: ' + error;
      return throwError(msg, 500, next);
    }
  }

  //create place
  //get place detail + post
}
module.exports = new PlaceController();
