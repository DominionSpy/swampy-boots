const panelsRouter = require('express').Router()

const Panel = require('../models/Panel')

panelsRouter.get('/', async (request, response) => {
  const panels = await Panel.find()

  response.json(panels)
})

module.exports = panelsRouter
