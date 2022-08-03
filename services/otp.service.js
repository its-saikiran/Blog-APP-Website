const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generators');

const { user, pass, lengthOfOtp } = require('../auth/config');


const generateOtp = () => {
    try {
        return otpGenerator.generate(parseInt(lengthOfOtp), {
            alphabets: false,
            upperCase: false,
            specialChar: false
        })
    } catch (error) {
        // console.log(error)
        return false;
    }
};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
})



const sendOtp = (toEmail) => {
    console.log(`---> otp section!`)
    try {
        const otp = generateOtp();
        if(otp.length != 6){
            return false;
        }

        const mailFormat = {
            from: user,
            to: toEmail,
            subject: 'From My Blog App.',
            text: `Your OTP for Email verification is- ${otp}` 
        };
        // console.log(mailFormat)

        transporter.sendMail(mailFormat, (err, info) => {
            if(err) {
                console.log(err)
                return
            };
            // console.log(`---> info`)
            console.log('---> Otp sent!')
        })
        return otp;
    } catch (error) {
        // console.log(error)
        return false;
    }
};

module.exports = sendOtp;