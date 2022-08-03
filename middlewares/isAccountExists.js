const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const isAccountExists = async(req, res, next) => {
    console.log(`---> isAccountExists section!`)
    // console.log(req.body)
    const { email } = req.body;
    try {
        const count = await prisma.user.count({
            where: { email }
        })
        if(count){
            return res.status(409).json({
                Error: 'Email already exists.'
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

module.exports = isAccountExists;