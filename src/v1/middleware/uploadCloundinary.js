const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { your_cloud_name, api_key, api_secret } = process.env;
// Thiết lập cloudinary
cloudinary.config({
  cloud_name: your_cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'reviewapp',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

const upload = multer({ storage: storage }).array('images', 20);

// Middleware upload nhiều ảnh lên cloud
const uploadCloundinary = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: `Lỗi khi tải lên ảnh Instanceof ${err}` });
    } else if (err) {
      return res.status(400).json({ message: `Lỗi khi tải lên ảnh ${err}` });
    }

    // Truy xuất thông tin ảnh trên Cloudinary và lấy đường dẫn URL
    Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file.path, function (error, result) {
            if (error) {
              reject('Cloundinary error: ' + error);
            } else {
              resolve(result.url);
            }
          });
        });
      })
    )
      .then((imageUrls) => {
        req.imageUrls = imageUrls;
        next();
      })
      .catch((error) => {
        return res
          .status(400)
          .json({ message: `Lỗi khi tải lên ảnh ${error}` });
      });
  });
};

module.exports = { upload, uploadCloundinary };
