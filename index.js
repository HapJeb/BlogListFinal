const app = require('./app')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { PORT, MONGODB_URI } = require('./utils/config')

mongoose.set('strictQuery', false)

const connectDatabase = async () => {
  if (MONGODB_URI) {
    return mongoose.connect(MONGODB_URI)
  }

  const mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  return mongoose.connect(uri)
}

connectDatabase()
  .then(() => {
    console.log(MONGODB_URI ? 'Connected to MongoDB' : 'Connected to in-memory MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  })
