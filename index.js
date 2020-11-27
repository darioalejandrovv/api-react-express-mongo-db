const express = require('express')
const app = express()
const port = process.env.PORT || '3000'
const apiRoutes = require('./routes/api') // Añádelo debajo de el require de Express.
const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/openwebinars'
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:JJ7vDwc0UxxVXDQ8@cluster0.zbawy.mongodb.net/postdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use(bodyParser.json()) // Convertirá el cuerpo en un objeto JSON.
mongoose.connect(mongoUri)

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