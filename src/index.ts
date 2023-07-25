import 'reflect-metadata'
import express, { Request, Response } from 'express';
import { router } from './routes';
import { AppDataSource } from './database';

const server = express()


server.use(express.json())

server.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: "200 - OK" })
})

server.use(router)


server.listen(8008, () => { })