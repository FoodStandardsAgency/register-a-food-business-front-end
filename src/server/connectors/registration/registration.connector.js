/**
 * @module connectors/registration
 */

const fetch = require('node-fetch')
const { SUBMIT_URL, API_SECRET, CLIENT_NAME } = require('../../config')
const { logEmitter } = require('../../services/logging.service')
const { registrationDouble } = require('./registration.double')

/**
 * Sends a new registration to the back-end service
 *
 * @param {object} submissionData The object containing all registration data and metadata
 * @param {string} regDataVersion The data version of this registration, corresponding to an entry in the config database
 *
 * @returns {object} The back-end service response
 */
const sendRequest = async (submissionData, regDataVersion) => {
  const DOUBLE_MODE = process.env.DOUBLE_MODE
  try {
    let res
    if (DOUBLE_MODE === 'true') {
      logEmitter.emit('doubleMode', 'registration.connector', 'sendRequest')
      res = registrationDouble(submissionData)
    } else {
      logEmitter.emit(
        'functionCallWith',
        'registration.connector',
        'sendRequest',
        SUBMIT_URL
      )
      const headers = {
        'Content-Type': 'application/json',
        'api-secret': API_SECRET,
        'client-name': CLIENT_NAME,
        'registration-data-version': regDataVersion
      }
      res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers,
        body: submissionData
      })
    }
    logEmitter.emit('functionSuccess', 'registration.connector', 'sendRequest')
    return res
  } catch (err) {
    logEmitter.emit(
      'functionFail',
      'registration.connector',
      'sendRequest',
      err
    )
    return err
  }
}

module.exports = { sendRequest }
