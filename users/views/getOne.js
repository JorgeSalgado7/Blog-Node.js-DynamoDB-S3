const AWS = require("aws-sdk");
const DYNAMO = new AWS.DynamoDB.DocumentClient();
require('dotenv').config()

const GET_USER = async (req, res) => {
    
    const { id } = req.params
    const PARAMS = { TableName: process.env.DB_USERS, Key: { id } }

    const { Item } = await DYNAMO.get(PARAMS).promise()
    res.status(200).json(Item)

}


module.exports = GET_USER