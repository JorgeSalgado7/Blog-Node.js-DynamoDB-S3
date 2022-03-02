/**
 * NODE.JS SETTINGS FOR BACKEND SERVER
 * @AUTHOR JORGE SALGADO
 * @URLAUTHOR https://jorgesalgado.com.mx
 * 
 * @VERSION 1.0.0
 * 
 * @LICENSE ISC
 * 
 * @DOCUMENTATION AT 
 * URL
 * 
 * 
*/
const EXPRESS = require('express')
const APP = EXPRESS()
const CORS = require('cors')

require('dotenv').config()
require('./lib/awsConfig')

//APPLICATION DEFINITION
const BASE_APPS = [
    EXPRESS.json(),
    CORS()
]

APP.use(BASE_APPS)

//STATIC ROUTES
const STATIC_ROUTES = []

//APPLICATION ROUTES
APP.use('/api/users', require('../users/urls'))
APP.use('/api/blog', require('../blog/urls'))
APP.use('/api/prueba', require('../prueba/urls'))


//SERVER


module.exports = APP