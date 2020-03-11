/**
 * The switches router updates the value of a specified global switch in the user's session and redirects back to the same page.
 * Routes: /switches/:switchName/:action/:originator
 * @module routers/switches
 */

const { Router } = require('express')
const { logEmitter } = require('../services/logging.service')
const switchesController = require('../controllers/switches.controller')

const switchesRouter = () => {
  const router = Router()
  router.post('/:switchName/:action/:originator', (req, res) => {
    logEmitter.emit(
      'functionCall',
      'Routes',
      '/switches/:switchName/:action route'
    )

    if (!req.session.switches) {
      req.session.switches = {}
    }

    const switchName = req.params.switchName
    const action = req.params.action

    const currentSwitchState = req.session.switches[switchName]
    const response = switchesController(
      currentSwitchState,
      action,
      req.session.cumulativeFullAnswers,
      req.body,
      `/${req.params.originator}`
    )

    req.session.switches[switchName] = response.newSwitchState

    req.session.cumulativeFullAnswers = response.cumulativeFullAnswers

    logEmitter.emit(
      'functionSuccess',
      'Routes',
      '/switches/:switchName/:action/:originator route'
    )
    req.session.save(err => {
      if (err) {
        logEmitter.emit('functionFail', 'Routes', '/switches route', err)
        throw err
      }
      res.redirect('back')
    })
  })

  return router
}

module.exports = { switchesRouter }
