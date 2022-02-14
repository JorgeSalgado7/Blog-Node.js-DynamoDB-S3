const JOI = require('@hapi/joi')

const USER_VALIDATOR = JOI.object({
    first_name: JOI.string().min(3).max(50).required(),
    last_name: JOI.string().min(3).max(50).required(),
    email: JOI.string().min(4).max(100).required().email(),
    //password: JOI.string().min(8).max(12).required(),
})

module.exports = USER_VALIDATOR