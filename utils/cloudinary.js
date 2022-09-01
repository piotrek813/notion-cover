const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (imagePath) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

const getTransformedImg = (text) => {
    let imageUrl = cloudinary.url('bg', {
      transformation: [
            {
                color: 'white',
                overlay: {font_family: "Montserrat", font_size: 84, alignment: 'center', weight: 'bold', text: text}
            },
            {
                flags: "layer_apply", gravity: "center"
            }
        ],
    });

    return imageUrl;
};

module.exports = {
    uploadImage, getTransformedImg
}