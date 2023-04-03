const placeService = require('../services/place.service');
const mediaService = require('../services/media.service');
const postService = require('../services/post.service');
const { success, throwError } = require('../utils/response');
const { MEDIA_TYPE, CATALOG } = require('../utils/const');
const { upload } = require('../utils/upload');
const multer = require('multer');
const unidecode = require('unidecode');

class PostController {
  async getPost(req, res, next) {
    try {
      const { catalog, postId, search } = req.query;
      let data;
      if (postId) {
        data = await postService.getPostDetail(postId);
      } else if (CATALOG[catalog]) {
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

  async createPost(req, res, next) {
    try {
      const userId = req.userId;
      if (!userId) return throwError('Unauthorized', 401, next);

      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError || err) {
          return throwError(`Upload fail: ${err}`, 500, next);
        }

        const info = { ...req.body, userId };

        const requiredFields = [
          'userId',
          'placeId',
          'content',
          'title',
          'star',
        ];
        const missingFields = requiredFields.filter((field) => !info[field]);
        if (missingFields.length > 0) {
          return throwError(
            `Missing data: ${missingFields.toString()}`,
            400,
            next
          );
        }
        // const { catalog } = info;
        // if (!CATALOG[catalog]) return throwError('Catalog invalid', 400, next);

        const getPlace = await placeService.getPlaceDetail(info.placeId);
        if (!getPlace.response)
          return throwError('Can not find place', 400, next);

        const cate = getPlace.response.category;
        if (!cate || !CATALOG[cate])
          return throwError('Catalog invalid', 400, next);

        info.catalog = cate;
        const { response, msg } = await postService.createPost(info);
        if (msg !== 'OK' || !response) {
          return throwError('Can not create post', 500, next);
        }

        const postRes = response;
        const files = req.files.filter((file) =>
          file.mimetype.startsWith('image/')
        );
        if (files.length <= 0) {
          return throwError('Missing or invalid media', 400, next);
        }

        const mediaData = await mediaService.createMedia(
          files.map((file) => ({
            url: `/static/${file.filename}`,
            type: MEDIA_TYPE.post,
            typeId: postRes.postId || 'Lỗi',
          }))
        );

        const mediaRes = mediaData?.response?.map((item) => item.dataValues);
        if (!mediaRes?.length) {
          return throwError('Can not create media', 500, next);
        }

        return success(res, 200, {
          place: { ...postRes, media: mediaRes },
        });
      });
    } catch (error) {
      const msg = 'Failed at create post controller: ' + error;
      return throwError(msg, 500, next);
    }
  }

  //get detail post + user+place+media
  //get list post +user
}
module.exports = new PostController();
