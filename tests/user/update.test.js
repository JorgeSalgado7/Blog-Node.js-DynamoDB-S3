const APP = require('../../backend/settings')
const SUPER_TEST = require('supertest')

describe('/PUT /api/users/update/:id', () => {

    it("Respond with status 202 if the user was updated", async () => {

        const USER = {
            first_name: "First",
            last_name: "Last",
        }

        const response = await SUPER_TEST(APP).put('/api/users/update/:id').send(USER)
        expect(response.status).toBe(202)
    })

})