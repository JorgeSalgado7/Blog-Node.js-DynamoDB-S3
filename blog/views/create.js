const AWS = require("aws-sdk")
const DYNAMO = new AWS.DynamoDB.DocumentClient()
const BLOG_VALIDATOR = require('../validator/blogFields')
const URL_GENERATOR = require('@jorge-salgado/url-generator');
const uuid = require('uuid')
require('dotenv').config()
const DATETIME = require('../../exss/lib/datetimeConfig')

const CREATE_BLOG = async (req, res) => {

    /**
     * @VERIFY REQUEST FIELDS ARE NOT EMPTY OR NULL
     * @RETURN ERROR MESSAGE IF TRUE
    */
    const { error } = BLOG_VALIDATOR.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})


    /**
     * @GET S3 KEY AND URL FROM INSERTED BLOG
     * @RETURN S3 KEY AND URL 
    */
    const { key, location } = req.file


    /**
     * @SANITIZE URL PATTERN
    */
    const URL = URL_GENERATOR(req.body.title)


    /**
     * @CREATE DB PARAMS
     * @PARAMS ID, TITLE, AUTHOR, CATEGORY, CONTENT, IMAGE_URL, IMAGE_KEY, READING_MINUTES, URL, CREATED_AT
    */
    const PARAMS = {
        TableName: process.env.DB_BLOG,
        Item: {
            id: uuid.v4(),
            image_url: location,
            image_key: key,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            content: req.body.content,
            reading_minutes: req.body.reading_minutes,
            slug: URL,
            created_at: DATETIME(),
        },
    }


    /**
     * @CREATE BLOG IN DB
     * @ON_ERROR RETURN ERROR MESSAGE
    */
    try{
        await DYNAMO.put(PARAMS).promise()
        res.status(201).json({error: null})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports = CREATE_BLOG