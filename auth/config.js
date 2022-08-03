require('dotenv').config();

const config = {
    port: process.env.PORT || 9000,
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    lengthOfOtp: process.env.LENGTH_OF_OTP || 6,
    secretKey: process.env.SECRET_KEY,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
};

module.exports = config;