const placeService = require('../services/place.service');
const mediaService = require('../services/media.service');
const postService = require('../services/post.service');
const { success, throwError } = require('../utils/response');
const { MEDIA_TYPE, PLACE_TYPE } = require('../utils/const');
const unidecode = require('unidecode');

class PostController {
  //*todo later: fix filter by catalog
  async getPost(req, res, next) {
    try {
      const { catalog, postId, search } = req.query;
      let data;
      if (postId) {
        data = await postService.getPostDetail(postId);
      } else if (catalog) {
        data = await postService.getPostByCatalog(catalog);
      } else data = await postService.getAllPost();

      if (search && !postId) {
        data = data?.response?.filter((item) => {
          const keyword = unidecode(search.toLowerCase());
          const content = unidecode(item.content.toLowerCase());
          return content.includes(keyword);
        });

        data = {
          msg: 'Ok',
          response: data,
        };
      }
      return success(res, 200, data);
    } catch (ex) {
      const msg = 'Failed at get post controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  //todo later: create post trước, upload sau
  async createPost(req, res, next) {
    try {
      const userId = req.userId;
      if (!userId) return throwError('Unauthorized', 401, next);

      //check media
      const imageUrls = req.imageUrls;
      if (!imageUrls || imageUrls.length <= 0) {
        return throwError('Server error: Can not upload media', 500, next);
      }

      const info = { ...req.body, userId };

      const requiredFields = ['userId', 'placeId', 'content', 'title', 'star'];
      const missingFields = requiredFields.filter((field) => !info[field]);
      if (missingFields.length > 0) {
        return throwError(
          `Missing data: ${missingFields.toString()}`,
          400,
          next
        );
      }

      const getPlace = await placeService.getPlaceDetail(info.placeId);
      if (!getPlace.response)
        return throwError('Can not find place', 400, next);

      const { category, timeFrom, timeTo, time } = getPlace.response;
      const postDto = { ...info, catalog: category, timeFrom, timeTo, time };

      const { response, msg } = await postService.createPost(postDto);
      if (msg !== 'OK' || !response) {
        return throwError('Can not create post', 500, next);
      }

      const postRes = response;

      const mediaData = await mediaService.createMedia(
        imageUrls.map((item) => ({
          url: item,
          type: MEDIA_TYPE.post,
          typeId: postRes.postId || 'Lỗi',
        }))
      );

      const mediaRes = mediaData?.response?.map((item) => item.url);
      if (!mediaRes?.length) {
        return throwError('Can not create media', 500, next);
      }

      return success(res, 200, {
        place: { ...postRes, media: mediaRes },
      });
    } catch (error) {
      const msg = 'Failed at create post controller: ' + error;
      return throwError(msg, 500, next);
    }
  }
}
module.exports = new PostController();
