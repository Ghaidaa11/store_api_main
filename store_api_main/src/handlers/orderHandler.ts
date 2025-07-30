import express, {Request, Response} from "express"
import { OrderStore } from "../models/order" 
import jwt from "jsonwebtoken"
import { authorizationHandler } from "../features/util"

const orderStore = new OrderStore()

export const create = async(req: Request, res: Response) => {

    const token = authorizationHandler(req, res)

    try {
       
        jwt.verify(token, process.env.TOKEN_SECRET || '')

    } catch {
        return res.status(401).json("Not authorized for this request")
    }
        const order = await orderStore.create(req.body)
        res.status(201).json(order)
} 

export const indexByUserId = async(req: Request, res: Response) => {
    const token = authorizationHandler(req, res)

    try {
        
        jwt.verify(token, process.env.TOKEN_SECRET || '')

    } catch {

        return res.status(401).json("Not authorized for this request")

    }
    try {
        const orders = await orderStore.index(parseInt(req.params.user_id))

        console.log(orders)

        res.status(200).json(orders)
        
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

const router = express.Router()

router.get("/:user_id", indexByUserId),
router.post("/", create)

export default router
