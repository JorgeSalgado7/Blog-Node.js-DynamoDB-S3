/**
 * NODE.JS SERVER
 * @AUTHOR JORGE SALGADO
 * @URLAUTHOR https://jorgesalgado.com.mx
 * 
 * @VERSION 1.0.0
 * 
 * @LICENSE ISC
 * 
*/
const APP = require('./settings')

APP.listen(process.env.PORT, ()=>{
    console.log('Server running...')
})