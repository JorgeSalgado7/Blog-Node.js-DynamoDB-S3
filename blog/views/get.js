const AWS = require("aws-sdk");
const DYNAMO = new AWS.DynamoDB.DocumentClient();
require('dotenv').config()

const GET_BLOGS = async (req, res) => {
    const { Items } = await DYNAMO.scan({TableName: process.env.DB_BLOG}).promise()
    res.status(200).json(Items)
}


module.exports = GET_BLOGS