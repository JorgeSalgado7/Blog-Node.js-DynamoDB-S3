const JOI = require('@hapi/joi')

const BLOG_VALIDATOR = JOI.object({
    title: JOI.string().required(),
    author: JOI.string().required(),
    category: JOI.string().required(),
    content: JOI.string().required(),
    reading_minutes: JOI.number().integer().required()
})

module.exports = BLOG_VALIDATOR