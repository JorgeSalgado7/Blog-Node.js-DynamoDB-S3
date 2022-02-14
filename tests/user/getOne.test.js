const APP = require('../../backend/settings')
const SUPER_TEST = require('supertest')

describe('/GET /api/users/:id', () => {

    it("Respond with a JSON containing all users", async () => {
        const response = await SUPER_TEST(APP).get('/api/users/:id').send()
        expect(response.status).toBe(200)
    })

})