import Client from '../database'

export type Product = {
    id: number,
    name: string,
    price: number,
    category: string
} 

export class ProductStore {

    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const query = 'select * from products'
            const result = await conn.query(query)
            conn.release()
            return result.rows
        } catch(err) {
            throw new Error(`Couldn't get products ${err}`)
        }
    }
    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const query = 'insert into products(name, price, category) values($1, $2, $3) returning *'
            const results = await conn.query(query, [p.name, p.price, p.category])
            conn.release()
            return results.rows[0]
        } catch(err) {
            throw new Error(`Couldn't create product ${err}`)
        }
    }

    async show(id: number): Promise<Product> {
        try {
    const conn = await Client.connect()
            const query = 'select * from products where id = $1'
            const result = await conn.query(query, [id])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Couldn't get product ${err}`)
        }
    }
}