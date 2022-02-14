const APP = require('../../backend/settings')
const SUPER_TEST = require('supertest')

describe('/GET /api/users/', () => {

    it("Respond with a JSON containing all users", async () => {
        const response = await SUPER_TEST(APP).get('/api/users/').send()
        expect(response.status).toBe(200)
    })

})