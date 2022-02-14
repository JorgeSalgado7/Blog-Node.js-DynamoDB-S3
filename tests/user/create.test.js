const APP = require('../../backend/settings')
const SUPER_TEST = require('supertest')

describe('/POST /api/users/create', () => {

    it("Respond with status 201 if the user was created", async () => {

        const USER = {
            first_name: "First",
            last_name: "Last",
            email: "email@outlook.com"
        }

        const response = await SUPER_TEST(APP).post('/api/users/create').send(USER)
        expect(response.status).toBe(201)
    })

})