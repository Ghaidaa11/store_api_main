import { Request, Response } from 'express'
import jwt from "jsonwebtoken"
import { user } from '../models/user'


export const authorizationHandler = (req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new Error("Invalid or missing Authorization header")
    }
    return authorizationHeader.split(' ')[1]
}

export const getTokenForTest = (user: user) => {

    return jwt.sign({user: user}, process.env.TOKEN_SECRET || '')

}