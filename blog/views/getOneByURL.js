const AWS = require("aws-sdk");
const DYNAMO = new AWS.DynamoDB.DocumentClient();
require('dotenv').config()

const GET_BLOG_BY_URL = async (req, res) => {

    const { url } = req.params
    
    /**
     * @CREATE THE PARAMS 
    */
    const PARAMS = { 
        TableName: process.env.DB_BLOG, 
        FilterExpression: 'slug = :slug',
        ExpressionAttributeValues: {
            ':slug': url
        } 
    }

    const { Items } = await DYNAMO.scan(PARAMS).promise()
    res.status(200).json(Items[0])
    
}


module.exports = GET_BLOG_BY_URL