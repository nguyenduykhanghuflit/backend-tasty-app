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
      //missing userId
      const userId = req.userId;
      if (!userId) return throwError('Unauthorized', 401, next);

      upload(req, res, async (err) => {
        // lỗi khi tải lên tệp hoặc lỗi khác
        if (err instanceof multer.MulterError || err) {
          return throwError(`Upload fail: ${err}`, 500, next);
        }

        const info = req.body;
        const stackErr = [];
        for (const [key, value] of Object.entries({ ...info, userId })) {
          if (!value) stackErr.push(key);
        }
        // missing data
        if (stackErr.length > 0)
          return throwError(`Missing data: ${stackErr.toString()}`, 400, next);

        const data = await placeService.createPlace({ ...info, userId });
        const placeRes = data?.response;

        // CREATE FAIL
        if (data?.msg !== 'OK' || !placeRes)
          return throwError('Can not create place', 500, next);

        // missing media
        let files = req.files;
        if (files.length <= 0) return throwError('Missing media', 400, next);

        // lưu thông tin về các tệp vào cơ sở dữ liệu
        files = req.files.map((file) => {
          return {
            url: `/static/${file.filename}`,
            type: MEDIA_TYPE.place,
            typeId: placeRes.placeId || 'Lỗi',
          };
        });

        const responseMedia = await mediaService.createMedia(files);
        return success(res, 200, {
          place: { ...placeRes, media: responseMedia?.response?.dataValues },
        });
      });
    } catch (error) {
      const msg = 'Failed at create place controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  //create place
  //get place detail + post
}
module.exports = new PlaceController();
