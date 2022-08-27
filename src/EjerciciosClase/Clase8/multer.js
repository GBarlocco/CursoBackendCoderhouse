const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

const app = express()

app.use('/static', express.static(__dirname + '/public'))

app.use('/uploads', express.static(__dirname + '/uploads'))


app.get('', (req, res) => res.json({ status: 'ok' }))

app.post('/uploadFile', upload.single('myFile'), (req, res) => {
    const file = req.file;
    const txt = req.body.text;
    console.log(txt);

    if (!file) {
        return res.status(400).json({
            error: 'Por favor sube un archivo'
        })
    }

    return res.json(file)
})

app.post('/uploadMultiple', upload.array('myFiles', 12), (req, res) => {
    const files = req.files

    if (!files.length) {
        return res.status(400).json({
            error: 'Por favor sube archivos'
        })
    }

    return res.json(files)
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP corriendo en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))