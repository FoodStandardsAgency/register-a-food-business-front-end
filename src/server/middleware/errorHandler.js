const { Next } = require('../next')
const { logEmitter } = require('../services/logging.service')

const errorHandler = (err, req, res, next) => {
  logEmitter.emit(
    'functionCallWith',
    'errorHandler',
    'errorHandler',
    `statusCode: ${res ? res.statusCode : err ? err.statusCode : null}`
  )
  Next.render(req, res, '/internal-server-error')
}

module.exports = { errorHandler }
