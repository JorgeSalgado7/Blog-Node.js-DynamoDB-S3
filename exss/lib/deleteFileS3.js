const AWS = require("aws-sdk");
const S3 = new AWS.S3()

const DELETE_FILE_S3 = (bucket, imageKey) => {
    
    const BUCKET_PARAMS = {
        Bucket: bucket,
        Key: imageKey
    }
    
    S3.deleteObject(BUCKET_PARAMS, (err, data) => {
        if(err) console.log(err)
    }).promise()
    
}

module.exports = DELETE_FILE_S3