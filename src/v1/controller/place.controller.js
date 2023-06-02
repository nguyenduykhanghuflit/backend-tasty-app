const placeService = require('../services/place.service');
const mediaService = require('../services/media.service');
const { success, throwError } = require('../utils/response');
const { MEDIA_TYPE, PLACE_TYPE, isSubarray } = require('../utils/const');
const unidecode = require('unidecode');
const { isValidTime, convertToMinutes } = require('../utils/timeUtils');
class PlaceController {
  //todo later: fix filter by catalog
  async getPlace(req, res, next) {
    try {
      const { placeId, category, search } = req.query;
      let data;
      if (placeId) {
        data = await placeService.getPlaceDetail(placeId);
      } else if (category) {
        data = await placeService.getPlaceByCatalog(category);
      } else data = await placeService.getAllPlace();

      if (search && !placeId) {
        data = data?.response?.filter((item) => {
          const placeName = unidecode(item.placeName.toLowerCase());
          const fullAddress = unidecode(item.fullAddress.toLowerCase());
          const keyword = unidecode(search.toLowerCase());
          return placeName.includes(keyword) || fullAddress.includes(keyword);
        });

        data = {
          msg: 'Ok',
          response: data,
        };
      }
      return success(res, 200, data);
    } catch (ex) {
      const msg = 'Failed at place controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  //todo later: create post trước, upload sau
  async createPlace(req, res, next) {
    try {
      //check login
      const userId = req.userId;
      if (!userId) return throwError('Unauthorized', 401, next);

      //check media
      const imageUrls = req.imageUrls;
      if (!imageUrls || imageUrls.length <= 0) {
        //  return throwError('Server error: Can not upload media', 500, next);
        return throwError('Vui lòng chọn hình ảnh', 500, next);
      }

      //check data require
      const info = req.body;
      const requiredFields = [
        'placeName',
        'description',
        'fullAddress',
        'lat',
        'lng',
        'timeFrom',
        'timeTo',
        'priceFrom',
        'priceTo',
        'phone',
        'category',
      ];
      const missingFields = requiredFields.filter((field) => !info[field]);
      if (missingFields.length > 0) {
        return throwError(
          'Vui lòng nhập đủ thông tin',
          // `Missing data: ${missingFields.toString()}`,
          400,
          next
        );
      }

      //check category and time
      let { category, timeFrom, timeTo } = info;
      console.log(category);
      const dataCate = [];
      category.forEach((element) => {
        dataCate.push(Object.keys(element)[0]);
      });
      category = dataCate;
      console.log(category);
      // if (!Array.isArray(category)) category = [category];
      if (!category || !isSubarray(category, PLACE_TYPE))
        return throwError('Catalog invalid', 400, next);

      // if (!isValidTime(timeFrom) || !isValidTime(timeTo))
      //   return throwError('Time invalid', 400, next);
      console.log(convertToMinutes(timeFrom));
      const jsonCate = JSON.stringify(category);
      const { response, msg } = await placeService.createPlace({
        ...info,
        category: jsonCate,
        timeFrom: convertToMinutes(timeFrom),
        timeTo: convertToMinutes(timeTo),
        time: `${timeFrom} - ${timeTo}`,
        userId,
      });
      if (msg !== 'OK' || !response) {
        return throwError('Can not create place', 500, next);
      }

      const placeRes = response;
      const mediaData = await mediaService.createMedia(
        imageUrls.map((item) => ({
          url: item,
          type: MEDIA_TYPE.place,
          typeId: placeRes.placeId || 'Lỗi',
        }))
      );

      const mediaRes = mediaData?.response?.map((item) => item.url);

      if (!mediaRes?.length) {
        return throwError('Can not create media', 500, next);
      }

      return success(res, 200, {
        place: { ...placeRes, media: mediaRes },
      });
    } catch (error) {
      const msg = 'Failed at create place controller: ' + error;
      return throwError(msg, 500, next);
    }
  }

  //get place detail + media +user
}
module.exports = new PlaceController();
