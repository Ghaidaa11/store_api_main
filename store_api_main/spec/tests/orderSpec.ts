import { OrderStore } from '../../src/models/order'
import supertest from 'supertest'
import app from '../../src/server'
import { getTokenForTest } from '../../src/features/util'

const store = new OrderStore()
const request = supertest(app)

describe('Test model functions', () => {
    it('create order', () => {
        expect(store.create).toBeDefined()
    })
    it('list orders', () => {
        expect(store.index).toBeDefined()
    })
})


let testUser = {
    id: 1,
    first_name: "Ali",
    last_name: "Ahmad",
    password: "123"
}

const token = getTokenForTest(testUser)

describe('Test handlers', () => {


    it('create order', async () => {
        let res = await request.post('/orders').set('Authorization', `Bearer ${token}`).send({
            "user_id": 1,
            "status": "active"
        })
        expect(res.status).toEqual(201)
    })

    it('list orders', async () => {
        let res = await request.get('/').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })
})
