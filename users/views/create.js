const AWS = require("aws-sdk")
const DYNAMO = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid')
require('dotenv').config()


//VALIDATORS
const USER_VALIDATOR = require('../validator/userFields')
const USER_EXISTS = require('../validator/userExists')

//UTILS
const CREATE_PASSWORD = require('../utils/createPassword')
const SEND_EMAIL = require('../utils/email')
const DATETIME = require('../../backend/lib/datetimeConfig')

const CREATE_USER = async (req, res) => {

    /**
     * @VERIFY REQUEST FIELD ARE NOT EMPTY OR NULL
     * @RETURN ERROR MESSAGE IR TRUE
    */
    const { error } = USER_VALIDATOR.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})

    /**
     * @VERIFY IF USER EXISTS
     * @RETURN ERROR MESSAGE IR TRUE
    */
    if(USER_EXISTS('licorne.usuarios', req.body.email) >= 0) return res.status(400).json({error: 'User already exists'})

    /**
     * @CREATE USER PASSWORD
     * @RETURN USER PASSWORD
    */
    const PASSWORD = await CREATE_PASSWORD()
    

    /**
     * @CREATE DB PARAMS
     * @PARAMS ID, NAME, LAST_NAME, EMAIL & PASSWORD 
     */
    const PARAMS = {
        TableName: process.env.DB_USERS,
        Item: {
            id: uuid.v4(),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: PASSWORD.hash,
            created_at: DATETIME(),
        },
    }

    /**
     * @CREATE USER IN DB
     * @ON_ERROR RETURN ERROR MESSAGE
     */
    try{
        await DYNAMO.put(PARAMS).promise()
        await SEND_EMAIL(req.body.first_name, req.body.last_name, req.body.email, PASSWORD.password)
        res.status(201).json({error: null})
    }
    catch (error) {
        res.json({error: error})
    }
    

}

module.exports = CREATE_USER