const AWS = require("aws-sdk")
const DYNAMO = new AWS.DynamoDB.DocumentClient()

const USER_EXISTS = async (table, email) => {

    const { Count } = await DYNAMO.scan({
        TableName: table,
        FilterExpression: "email = :email", 
        ExpressionAttributeValues: { ":email": email},       
    }).promise()

    return Count

}

module.exports = USER_EXISTS