import Client from "../database"

export enum OrderStatus {
    active = 'active', 
    complete = 'complete'
}

export type Order = {
    id: number,
    user_id: number,
    status: OrderStatus
}


export class OrderStore {

    async index(user_id: number): Promise<Order[]> {
        try{
            const conn = await Client.connect()

            const query = 'select * from orders where user_id = $1'

            const result = await conn.query(query, [user_id])
            console.log(query)
            conn.release()
            
            return result.rows

        } catch (err) {
            throw new Error(`Couldn't get Orders error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try{
            const conn = await Client.connect()

            const sql = 'insert into orders(user_id, status) values ($1, $2) returning *'

            const result = await conn.query(sql, [o.user_id, o.status])

            conn.release()

            return result.rows[0]

        } catch(err) {
            throw new Error(`Couldn't create order error: ${err}`)
        }
    }
}
