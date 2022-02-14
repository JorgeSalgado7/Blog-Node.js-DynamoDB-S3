const multer = require('multer')
const DATETIME = require('../lib/datetimeConfig')

/**
 * @CREATE MULTER STORAGE
 * @RETURN MULTER STORAGE FILE
*/
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './img')
    },
    filename: function(req, file, cb){
        cb(null, `${DATETIME()}-${file.originalname}`)
    }
})

const UPLOAD_IMAGE = multer({storage})

module.exports = UPLOAD_IMAGE