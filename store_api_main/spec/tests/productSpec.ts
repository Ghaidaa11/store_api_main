import { ProductStore } from '../../src/models/product'
import supertest from 'supertest'
import app from '../../src/server'
import { getTokenForTest } from '../../src/features/util'

const store = new ProductStore()
const request = supertest(app)

describe('Test model functions', () => {
    it('create product', () => {
        expect(store.create).toBeDefined()
    })
    it('list products', () => {
        expect(store.index).toBeDefined()
    })
    it('show a product', () => {
        expect(store.show).toBeDefined()
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

    let productId: string;

    it('create product', async () => {
        let res = await request.post('/products').set('Authorization', `Bearer ${token}`).send({
            'name': 'laptop',
            'price': 20.5,
            'category': 'computer'
        })
        productId = String(res.body.id)
        expect(res.status).toEqual(200)
    })

    it('list products', async () => {
        let res = await request.get('/').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('show a product', async () => {
        let res = await request.get(`/products/${productId}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body.category).toContain('computer')

    })
})
