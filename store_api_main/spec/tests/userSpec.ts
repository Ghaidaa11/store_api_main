import supertest from 'supertest'
import app from '../../src/server'

const request = supertest(app)

let token: string

describe("Test users api", () => {

    beforeAll(async () => {
    
        let response = await request.post("/users").send({
          first_name: 'Test',
          last_name: 'User',
          password: 'test123'
        });

        token = response.body.token

    })

    it("Test index api", async () => {
        let response = await request.get("/users")
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({ error: "Not authorized for this request" });
    })

 
})