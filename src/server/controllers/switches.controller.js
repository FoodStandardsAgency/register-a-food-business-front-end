/**
 * @module controllers/switches
 */

const {
  cleanEmptiedAnswers
} = require('../services/session-management.service')
const { changeSwitch } = require('../services/switches.service')
const { logEmitter } = require('../services/logging.service')

/**
 * Returns an object containing the new cumulativeFullAnswers value and the new switch status.
 *
 * @param {boolean} currentSwitchState The current value of the given switch
 * @param {string} action "on", "off", or "toggle"
 * @param {object} previousAnswers An object containing every past answer that has been given by the user
 * @param {object} newAnswers An object containing new answers from the current page
 * @param {string} currentPage The 'originator' page that the user has come from
 *
 * @returns {object} The new cumulativeFullAnswers value and the new switch status.
 */
const switchesController = (
  currentSwitchState,
  action,
  previousAnswers,
  newAnswers,
  currentPage
) => {
  logEmitter.emit('functionCall', 'switches.controller', 'switchesController')

  const controllerResponse = {
    cumulativeFullAnswers: {},
    newSwitchState: undefined
  }

  try {
    const newState = changeSwitch(action, currentSwitchState)

    controllerResponse.newSwitchState = newState

    const newAnswersArray = Object.values(Object.assign({}, newAnswers))

    let cleanedPreviousAnswers = Object.assign({}, previousAnswers)

    if (newAnswersArray.length > 0) {
      // remove any answers that were previously given a truthy value but have since been emptied
      cleanedPreviousAnswers = cleanEmptiedAnswers(
        previousAnswers,
        newAnswersArray,
        currentPage
      )
    }

    controllerResponse.cumulativeFullAnswers = Object.assign(
      {},
      cleanedPreviousAnswers,
      newAnswers
    )

    logEmitter.emit(
      'functionSuccess',
      'switches.controller',
      'switchesController'
    )
    return controllerResponse
  } catch (err) {
    logEmitter.emit(
      'functionFail',
      'switches.controller',
      'switchesController',
      err
    )
    throw err
  }
}

module.exports = switchesController
