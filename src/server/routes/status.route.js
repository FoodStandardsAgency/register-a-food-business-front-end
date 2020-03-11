/**
 * The status router returns status data - all statuses, a specified status name, or a simple healthcheck (alive/not alive).
 * Routes: /status/all, /status/healthcheck, /status/name/:statusName
 * @module routers/status
 */

const { Router } = require('express')
const { logEmitter } = require('../services/logging.service')
const { getStatus } = require('../services/status.service')

const statusRouter = () => {
  const router = Router()

  router.get('/all', async (req, res) => {
    logEmitter.emit('functionCall', 'Routes', '/status/all route')
    const status = await getStatus()
    logEmitter.emit('functionSuccess', 'Routes', '/status/all route')
    res.send(JSON.stringify(status))
  })

  router.get('/healthcheck', (req, res) => {
    logEmitter.emit('functionCall', 'Routes', '/status/healthcheck route')
    logEmitter.emit('functionSuccess', 'Routes', '/status/healthcheck route')
    res.send('FRONT END healthcheck PASSED')
  })

  router.get('/name/:statusName', async (req, res) => {
    logEmitter.emit('functionCall', 'Routes', '/status/name/:statusName route')
    const statusName = req.params.statusName
    const status = await getStatus(statusName)
    logEmitter.emit(
      'functionSuccess',
      'Routes',
      '/status/name/:statusName route'
    )
    res.send(JSON.stringify(status))
  })

  return router
}

module.exports = { statusRouter }
