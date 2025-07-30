import { Request, Response } from "express";
import { UserStore } from "../models/user";
import jwt from 'jsonwebtoken'
import { authorizationHandler } from "../features/util";


const store = new UserStore()

export const create = async (req: Request, res: Response) => {
  try {
    const user = await store.create(req.body);
    const token = jwt.sign({user: user}, process.env.TOKEN_SECRET || '')
    res.status(201).json(token);
  } catch (err) {
    res.status(400)
    res.json(err);
  }
}

export const index = async (req: Request, res: Response) => {
    
        const token: string = authorizationHandler(req, res)

    try {
            jwt.verify(token, process.env.TOKEN_SECRET || '')

    } catch {
       return res.status(401).json({ error: "Not authorized for this request" })
    }
    try{
        const users = await store.index()
        res.status(200).json(users)
    } catch(err) {
        res.status(400)
        res.json(err);
    }
}

export const show = async (req: Request, res: Response) => {
        
        const token = authorizationHandler(req, res)        
        try {

            jwt.verify(token, process.env.TOKEN_SECRET || '')
            
        } catch {
        return res.status(401).json({ error: "Not authorized for this request" })
    }
    try{
        const users = await store.show(parseInt(req.params.id))
        res.status(200).json(users)
    } catch(err) {
        res.status(400)
        res.json(err);
    }
}