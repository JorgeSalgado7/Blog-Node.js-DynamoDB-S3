const AWS = require("aws-sdk");
const DYNAMO = new AWS.DynamoDB.DocumentClient();
require('dotenv').config()

//UTILS
const DATETIME = require('../../exss/lib/datetimeConfig')

const EDITAR_USUARIO = async (req, res) => {

    const { id } = req.params
    const { first_name, last_name } = req.body

    const PARAMS = { 
        TableName: process.env.DB_USERS, 
        Key: {id},
        UpdateExpression: "set first_name = :first_name, last_name = :last_name, updated_at = :updated_at",
        ExpressionAttributeValues:{
            ":first_name": first_name,
            ":last_name": last_name,
            ":updated_at": DATETIME(),
        },
        ReturnValues: "UPDATED_NEW"
    }

    await DYNAMO.update(PARAMS, (error, data) => {
        if(error) return res.status(400).json({error: error.message})
    }).promise()

    res.status(202).json({error: null})


}


module.exports = EDITAR_USUARIO