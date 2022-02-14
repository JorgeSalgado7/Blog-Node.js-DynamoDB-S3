const APP = require('../../backend/settings')
const SUPER_TEST = require('supertest')

describe('/DELETE /api/users/delete/:id', () => {

    it("Respond with status 202 if the user was updated", async () => {
        const response = await SUPER_TEST(APP).delete('/api/users/delete/:id').send()
        expect(response.status).toBe(202)
    })

})