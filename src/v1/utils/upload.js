const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('cloudinary').v2;

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

// define the function to upload image to cloudinary
const uploadImageToCloudinary = async (imageFile) => {
  try {
    // upload the image to cloudinary
    const result = await cloudinary.uploader.upload(imageFile, storage);
    // return the public URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload image to cloudinary');
  }
};

module.exports = {
  uploadImageToCloudinary,
};
