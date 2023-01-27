import { Request, Response } from 'express'

export const ping = (req: Request, res: Response) => res.json({pong: true})

export const random = (req: Request, res: Response) => {
    let nRandom: number = Math.floor(Math.random() * 1000)
    res.json({ number: nRandom })
}

export const nome = (req: Request, res: Response) => {
    const nome = req.params.nome
    res.json({nome})
}