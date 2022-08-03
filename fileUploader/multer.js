const multer = require('multer')
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        filename: ((req, file, cb) => {
            const ext = path.extname(file.originalname)
            if(ext != '.jpg' && ext != '.jpeg' && ext != '.png'){
                cb(new Error('File type not supported!'), false)
                return 
            }
            cb(null, 'true')
        })
    })
})

module.exports = upload;