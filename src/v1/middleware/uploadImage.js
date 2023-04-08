const multer = require('multer');
const { upload } = require('../utils/upload');
const { throwError } = require('../utils/response');
// middleware upload nhiều ảnh
const uploadImages = (req, res, next) => {
  upload(req, res, async (err) => {
    // lỗi khi tải lên tệp hoặc lỗi khác
    if (err instanceof multer.MulterError || err) {
      return throwError(`Upload fail: ${err}`, 500, next);
    }

    // Lưu trữ danh sách các ảnh đã upload vào biến tạm thời
    req.imageUrls = req.files.map((file) => file.filename);

    next();
  });
};

module.exports = uploadImages;
