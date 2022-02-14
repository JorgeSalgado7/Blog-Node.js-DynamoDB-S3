const AWS = require("aws-sdk");
const DYNAMO = new AWS.DynamoDB.DocumentClient();
require('dotenv').config()
const DELETE_FILE_S3 = require('../../backend/lib/deleteFileS3')

const DELETE_BLOG = async (req, res) => {

    const { id } = req.params

    /**
     * @GET THE BLOG FROM DB
     * @RETURN ITEM FROM DB
     */
    const PARAMS_BLOG = { TableName: process.env.DB_BLOG, Key: { id } }
    const { Item } = await DYNAMO.get(PARAMS_BLOG).promise()

    /**
     * @DELETE CURRENT FILE FROM S3
     * @PARAMS BUCKET, IMAGE KEY
    */
    await DELETE_FILE_S3(process.env.AWS_BUCKET, Item.image_key)

    
    /**
     * @DELETE CURRENT DOCUMENT FROM DB
     * @RETURN ERROR MESSSAGE IF FAIL
    */
    try {
    
        const PARAMS = { TableName: process.env.DB_BLOG, Key: { id } }
        await DYNAMO.delete(PARAMS).promise()
        res.status(202).json({error: null})

    }
    catch (error) {
        res.status(400).json({error: error.message})
    }

}


module.exports = DELETE_BLOG