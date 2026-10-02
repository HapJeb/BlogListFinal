const express = require('express')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.get('/', (request, response) => {
  response.send('<h1>Blog list backend</h1>')
})

module.exports = app
