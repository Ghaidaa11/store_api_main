import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import usersRoutes from "./routes/userRoutes"
import orderRoutes from './handlers/orderHandler'
import productHandler from './handlers/productHandler'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use('/users', usersRoutes);
app.use('/orders', orderRoutes)
app.use('/products', productHandler)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app