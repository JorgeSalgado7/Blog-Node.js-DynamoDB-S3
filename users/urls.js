const ROUTER = require('express').Router()

//DEFINE YOUR ROUTES HERE
const CREATE_USER = require('./views/create')
const GET_USERS = require('./views/get')
const GET_USER = require('./views/getOne')
const UPDATE_USER = require('./views/update')
const DELETE_USER = require('./views/delete')

//ROUTES
ROUTER.post('/create', CREATE_USER)
ROUTER.get('/', GET_USERS)
ROUTER.get('/:id', GET_USER)
ROUTER.put('/update/:id', UPDATE_USER)
ROUTER.delete('/delete/:id', DELETE_USER)

module.exports = ROUTER