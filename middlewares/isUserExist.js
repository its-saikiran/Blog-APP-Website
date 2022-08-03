const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const isUserExist = async(req, res, next) => {
    console.log(`---> isUserExist section!`)
    // console.log(req.body)
    const { email } = req.body;
    try {
        const count = await prisma.user.count({
            where: { email }
        })
        if(!count){
            return res.status(404).json({
                Error: 'Please register first.'
            })
        }
        next()
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};

module.exports = isUserExist;