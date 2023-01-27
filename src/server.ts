import express, { Request, Response} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRouters from './routes/api'

dotenv.config()

const server = express()

server.use(cors())

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({extended: true}))

server.use(/*'/api',*/ apiRouters)

server.use((req: Request, res: Response) => {
    res.status(404)
    res.json({ message: 'Endpoint não encontrado' })    
})

server.listen(process.env.PORT)