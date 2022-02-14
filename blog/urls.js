const ROUTER = require('express').Router()
const STORE_IMAGE_S3 = require('../backend/lib/storageS3')

//DEFINE YOUR ROUTES HERE
const CREATE_BLOG = require('./views/create')
const GET_BLOGS = require('./views/get')
const GET_BLOG = require('./views/getOne')
const GET_BLOG_BY_URL = require('./views/getOneByURL')
const UPDATE_BLOG = require('./views/update')
const DELETE_BLOG = require('./views/delete')

//ROUTES
ROUTER.post('/create', STORE_IMAGE_S3.single('image'), CREATE_BLOG)
ROUTER.get('/', GET_BLOGS)
ROUTER.get('/:id', GET_BLOG)
ROUTER.get('/url/:url', GET_BLOG_BY_URL)
ROUTER.put('/update/:id', STORE_IMAGE_S3.single('image'), UPDATE_BLOG)
ROUTER.delete('/delete/:id', DELETE_BLOG)

module.exports = ROUTER