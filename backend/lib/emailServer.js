const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'jsalgado@licorne.mx',
        pass: 'tkmijuubctlcfidc'
    },
    tls: {
        rejectUnauthorized: false
    },
})

/*
transporter.verify().then(() => {
    console.log('Email server running...')
})
*/

module.exports = transporter