const AWS = require("aws-sdk");
const DYNAMO = new AWS.DynamoDB.DocumentClient();
require('dotenv').config()


const DELETE_USER = async (req, res) => {

    const { id } = req.params
    const PARAMS = { TableName: process.env.DB_USERS, Key: { id } }
    await DYNAMO.delete(PARAMS).promise()
    res.status(202).json({error: null})

}


module.exports = DELETE_USER