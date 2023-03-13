const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/v1/public/'); // thư mục lưu trữ tệp được tải lên
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // tên tệp sẽ được lưu trữ trên máy chủ
  },
});
const upload = multer({ storage: storage }).array('image', 20);

module.exports = {
  upload,
};
