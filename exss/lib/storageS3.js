const multer = require('multer')
var multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const S3 = new AWS.S3()
require('dotenv').config()
const DATETIME = require('../lib/datetimeConfig')

/**
 * @CREATE AWS S3 STORAGE
 * @RETURN AWS S3 STORAGE FILE
*/
const STORE_IMAGE_S3 = multer({
    storage: multerS3({
        s3: S3,
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `${DATETIME()}-${file.originalname}`)
        }
    })
})

module.exports = STORE_IMAGE_S3