const express = require('express')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const panelRouter = require('./controllers/panels')

const app = express()

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'))
}

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.clacks)

app.use('/api/panels', panelRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
