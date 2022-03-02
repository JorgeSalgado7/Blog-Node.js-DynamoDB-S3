const AWS = require("aws-sdk");
const DYNAMO = new AWS.DynamoDB.DocumentClient()
require('dotenv').config()
const URL_GENERATOR = require('@jorge-salgado/url-generator');
const DELETE_FILE_S3 = require('../../exss/lib/deleteFileS3')
const DATETIME = require('../../exss/lib/datetimeConfig')

const UPDATE_BLOG = async (req, res) => {

    //OBTENEMOS LOS DATOS DEL FRONTEND
    const { id } = req.params
    const { title, author, category, content, reading_minutes, image_key } = req.body

    /**
     * @UPDATE BLOG WHIT THE INITIAL IMAGE
    */
    if (req.file !== undefined) {

        /**
         * @DELETE CURRENT FILE FROM S3
         * @PARAMS BUCKET, IMAGE KEY
        */
        await DELETE_FILE_S3(process.env.AWS_BUCKET, image_key)


        /**
         * @GET THE NEW IMAGE PARAMS FROM REQUEST FILE S3
         * @PARAMS IMAGE LOCATION, IMAGE KEY
        */
        const NEW_IMAGE_KEY = req.file.key
        const NEW_IMAGE_LOCATION = req.file.location


        /**
         * @SANITIZE URL PATTERN
         * @GENERATE URL FROM TITLE
        */
        const URL = URL_GENERATOR(title)


        /**
         * @CREATE DB PARAMS
         * @PARAMS ID, TITLE, AUTHOR, CATEGORY, CONTENT, IMAGE_URL, IMAGE_KEY, READING_MINUTES, URL, UPDATED_AT
        */
        const PARAMS = {
            TableName: process.env.DB_BLOG,
            Key: {id},
            UpdateExpression: "set title = :title, author = :author, category = :category, content = :content, reading_minutes = :reading_minutes, image_url = :image_url, image_key = :image_key, slug = :slug, updated_at = :updated_at",
            ExpressionAttributeValues: {
                ":title": title,
                ":author": author,
                ":category": category,
                ":content": content,
                ":reading_minutes": reading_minutes,
                ":image_url": NEW_IMAGE_LOCATION,
                ":image_key": NEW_IMAGE_KEY,
                ":slug": URL,
                ":updated_at": DATETIME()
            },
            ReturnValues: "UPDATED_NEW",
        }


        /**
         * @UPDATE BLOG IN DB
         * @ON_ERROR RETURN ERROR MESSAGE
        */
        try {
            await DYNAMO.update(PARAMS).promise()
            res.status(202).json({error: null})
        }
        catch(error){
            res.status(400).json({error: error.message})
        }


    }


    /**
     * @UPDATE BLOG WHIT A NEW IMAGE
    */
    else{

        /**
         * @SANITIZE URL PATTERN
         * @GENERATE URL FROM TITLE
        */
        const URL = URL_GENERATOR(title)

        
        /**
          * @CREATE DB PARAMS
          * @PARAMS ID, TITLE, AUTHOR, CATEGORY, CONTENT, IMAGE_URL, IMAGE_KEY, READING_MINUTES, URL, UPDATED_AT
        */
        const PARAMS = {
            TableName: process.env.DB_BLOG,
            Key: {id},
            UpdateExpression: "set title = :title, author = :author, category = :category, content = :content, reading_minutes = :reading_minutes, slug = :slug, updated_at = :updated_at",
            ExpressionAttributeValues: {
                ":title": title,
                ":author": author,
                ":category": category,
                ":content": content,
                ":reading_minutes": reading_minutes,
                ":slug": URL,
                ":updated_at": DATETIME()
            },
            ReturnValues: "UPDATED_NEW",
        }
 
 
        /**
          * @UPDATE BLOG IN DB
          * @ON_ERROR RETURN ERROR MESSAGE
        */
        try {
            await DYNAMO.update(PARAMS).promise()
            res.status(202).json({error: null})
        }
        catch(error){
            res.status(400).json({error: error.message})
        }
        

    }

}


module.exports = UPDATE_BLOG