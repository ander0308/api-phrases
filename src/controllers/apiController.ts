import { Request, Response } from 'express'
import { Sequelize } from 'sequelize'
import { Phrase } from '../models/Phrase'

export const ping = (req: Request, res: Response) => res.json({pong: true})

export const random = (req: Request, res: Response) => {
    let nRandom: number = Math.floor(Math.random() * 1000)
    res.json({ number: nRandom })
}

export const nome = (req: Request, res: Response) => {
    const nome = req.params.nome
    res.json({nome})
}

export const createPhrase = async (req: Request, res: Response) => {
    let { author, txt } = req.body
    let newPhrase = await Phrase.create({ author, txt })

    res.status(201)
    res.json({id: newPhrase.id, author, txt})
}

export const listPhrases = async (req: Request, res: Response) => {
    const list = await Phrase.findAll()
    res.json({list})
}

export const getPhrase = async (req: Request, res: Response) => {
    const { id }= req.params

    const phrase = await Phrase.findByPk(id)
    if(phrase) {
        res.json({phrase})
    } else {
        res.json({ error: 'Frase não encontrada'})
    }
}

export const updatePhrase = async(req: Request, res: Response) => {
    const {id} = req.params
    const { author, txt} = req.body

    let phrase = await Phrase.findByPk(id)

    if(phrase) {
        phrase.author = author;
        phrase.txt = txt;
        await phrase.save()

        res.json({phrase})
    } else {
        res.json({ error: 'Frase não encontrada' })
    }
}

export const deletePhrase = async (req: Request, res: Response) => {
    const { id } = req.params

    await Phrase.destroy({ where: { id }})

    res.json({})
}

export const randomPhrase = async (req: Request, res: Response) => {
    let phrase = await Phrase.findOne({
        order: [
            Sequelize.fn('RANDOM')
        ]
    })
    if(phrase){
        res.json({phrase})
    } else {
        res.json({ error: 'Nao há frases cadastrada'})
    }
}