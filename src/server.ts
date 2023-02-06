import express, { Request, Response, ErrorRequestHandler} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRouters from './routes/api'
import { MulterError } from 'multer'

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

// Tratando qualquer tipo de erro que der na alicação
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400) //Bad Request

    if( err instanceof MulterError) {
        res.json({ error: err.code})
    } else {
        console.log( err )
        res.json({ error: 'Ocorreu um erro inesperado!'})
    }
} 
server.use(errorHandler)

server.listen(process.env.PORT)