import Client from "../database"
import bcrypt from "bcrypt"



export type user = {
    id: number,
    first_name: string,
    last_name: string,
    password: string
}

export class UserStore {

    async create(u: user): Promise<user> {
        try {
            const conn = await Client.connect()

            const saltRounds = parseInt(process.env.SALT_ROUND || '10');

            const pepper = process.env.BCRYPT_PASSWORD || ''
            
            const query = 'insert into users(first_name, last_name, password) values ($1, $2, $3) returning *'

            const hash = bcrypt.hashSync(
                u.password + pepper, 
                saltRounds
            );


            const result = await conn.query(query, [u.first_name, u.last_name, hash])

            conn.release()

            return result.rows[0]

        } catch (err) {
            throw new Error(`couldn't create user error: ${err}`)
        }
    }

    async index(): Promise<user[]> {
        try {
            const conn = await Client.connect()
            const query = " select id, first_name, last_name from users" 
            const result = await conn.query(query)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error("Couldn't get users")
        }
    }

    async show(id: number): Promise<user> {
        try {
            const conn = await Client.connect()
            const query = " select id, first_name, last_name from users where id = $1" 
            const result = await conn.query(query, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error("Couldn't get users")
        }
    }
}