import { Router } from 'express'
import multer from 'multer'

import * as ApiController from '../controllers/apiController'

// **** Esta função serve para termos mais controle dos arquivos que enviamos. 

// const storageConfig = multer.diskStorage({
//     destination(req, file, callback) {
//         callback(null, './temp')
//     },
//     filename(req, file, callback) {
//         let randomName = Math.floor(Math.random() * 999999) 
//         callback(null, `${randomName+Date.now()}.jpg`)
//     },
// })

const upload = multer({
    dest: './temp', //configuração simples, não temos muito controle do que estamos enviando.
    fileFilter(req, file, callback) {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'] // permitindo apenas essas aquivos

        if(allowed.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(null, false)
        }
        // callback(null, allowed.includes(file.mimetype)) // também posso fazer assim, pois o retorno da função já é true ou false.
    },
    limits: { fieldSize: 3000000 } // limita tamanho do arquivo
    // storage: storageConfig  (Função declarada acima)
})

const router = Router()

router.get('/ping', ApiController.ping)

router.get('/random', ApiController.random)

router.get('/nome/:nome', ApiController.nome)

router.post('/frases', ApiController.createPhrase)

router.get('/frases', ApiController.listPhrases)

router.get('/frase/aleatoria', ApiController.randomPhrase)

router.get('/frase/:id', ApiController.getPhrase)

router.put('/frase/:id', ApiController.updatePhrase)

router.delete('/frase/:id', ApiController.deletePhrase)

router.post('/upload', upload.single('avatar'), ApiController.uploadFile)


export default router