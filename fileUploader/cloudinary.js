const cloudinary = require('cloudinary').v2;

const { cloudName, apiKey, apiSecret } = require('../auth/config')

const cloud = cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
})

module.exports = cloudinary;