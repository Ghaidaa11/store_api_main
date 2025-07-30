import supertest from 'supertest'
import app from '../../src/server'
import { getTokenForTest } from '../../src/features/util'
import { UserStore } from '../../src/models/user'

const request = supertest(app)


describe('Test user model functions', () => {

    const store = new UserStore()

    it('index function', () => {
        expect(store.index).toBeDefined()
    })
    it('create function', () => {
        expect(store.create).toBeDefined()
    })
    it('show function', () => {
        expect(store.show).toBeDefined()
    })
})

let testUser = {
    id: 1,
    first_name: "Ali",
    last_name: "Ahmad",
    password: "123"
}

let token = getTokenForTest(testUser)

describe("Test users api", () => {

    it("create user api", async () => {
    
        let response = await request.post("/users").send({
          first_name: 'Test',
          last_name: 'User',
          password: 'test123'
        });

        expect(response.body.token)

    })

    it("Test index api", async () => {
        
        let response = await request.get("/users").set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200);
    })

    it("show user api", async () => {

        let response = await request.get(`/users/${testUser.id}`).set('Authorization', `Bearer ${token}`) 

        expect(response.status).toBe(200)
        expect(response.body.last_name).toBe('User')
        
    })

 
})