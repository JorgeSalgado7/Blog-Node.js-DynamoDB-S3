const ROUTER = require('express').Router()

//DEFINE YOUR ROUTES HERE
const GET = require('./views/get')


//ROUTES
ROUTER.get('/', GET)


module.exports = ROUTER