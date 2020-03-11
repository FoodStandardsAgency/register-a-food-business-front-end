/**
 * The pdfs router returns pdf document files
 * @module routers/pdfs
 */

const { Router } = require('express')
const { logEmitter } = require('../services/logging.service')
const path = require('path')

const pdfsRouter = () => {
  const router = Router()

  router.get('/feedback', async (req, res) => {
    logEmitter.emit('functionCall', 'Routes', '/pdfs/feedback')
    let file = path.join(
      __dirname,
      '..',
      '/static/pdfs/feedback-declaration.pdf'
    )
    res.sendFile(file)
    logEmitter.emit('functionSuccessWith', 'Routes', '/pdfs/feedback', file)
  })

  return router
}

module.exports = { pdfsRouter }
