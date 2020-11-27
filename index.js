const express = require('express')
const apiRoutes = require('./routes/api')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || '3000'
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Local'

mongoose.connect(mongoUri)

app.use(bodyParser.json())
app.use(cors())

app.get('/api/posts/', apiRoutes.loadPosts)
app.get('/api/posts/:id', apiRoutes.loadPost)
app.post('/api/posts/', apiRoutes.newPost)
app.put('/api/posts/', apiRoutes.updatePost) // No lleva parámetro id, ya que lo mandamos en el body.
app.delete('/api/posts/:id', apiRoutes.deletePost)

function handleError(err) {
    console.error(`[Error] ${err.message}`)
    console.error(err.stack)
}
app.on('error', (err) => handleError)
app.on('uncaughtException', (err) => handleError)
app.on('unhandledRejection', (err) => handleError)