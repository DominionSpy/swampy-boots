const panelsRouter = require('express').Router()

const Panel = require('../models/Panel')

panelsRouter.get('/', async (request, response) => {
  const panels = await Panel.find()

  response.json(panels)
})

panelsRouter.get('/:id', async (request, response) => {
  const panel = await Panel.findById(request.params.id)
  if (panel) {
    response.json(panel)
  } else {
    response.status(404).end()
  }
})

module.exports = panelsRouter
