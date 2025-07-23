import express, {Request, Response} from 'express'
import { ProductStore } from '../models/product'
import jwt from 'jsonwebtoken'


const store = new ProductStore()

export const index = async( _req: Request, res: Response) => {
    const products = await store.index()
    res.status(200).json(products)
}

export const show = async(req: Request, res: Response) => {
    const product = await store.show(parseInt(req.params.id))
    res.status(200).json(product)
}

export const create = async(req: Request, res: Response) => {
    try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET || '')
        } catch {
            return res.status(401).json("Not authorized for this request")
        }
    
    const product = await store.create(req.body)
    res.status(200).json(product)
}

const router = express.Router() 

router.get("/", index)
router.post("/", create)
router.get("/:id", show)

export default router