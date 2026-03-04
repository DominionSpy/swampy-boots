const router = require('express').Router()

const Panel = require('../models/panel')

router.post('/reset', async (request, response) => {
  await Panel.deleteMany()

  response.status(204).end()
})

module.exports = router
