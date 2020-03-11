jest.mock('node-fetch')
jest.mock('./registration.double')

const fetch = require('node-fetch')
const { sendRequest } = require('./registration.connector')
const { registrationDouble } = require('./registration.double')

const testSubmissionData = { example: 'value' }
const testRegDataVersion = '1.0.0'

describe('Function: sendRequest', () => {
  beforeEach(() => {
    process.env.DOUBLE_MODE = 'false'
  })

  let result

  describe('When fetch succeeds', () => {
    beforeEach(async () => {
      fetch.mockImplementation(() => {
        return 'response'
      })
      result = await sendRequest(testSubmissionData, testRegDataVersion)
    })

    it('Should return res', () => {
      expect(result).toBe('response')
    })

    it('Should call fetch with the correct args', () => {
      expect(fetch).toHaveBeenLastCalledWith(expect.anything(), {
        method: 'POST',
        headers: expect.objectContaining({
          'registration-data-version': '1.0.0'
        }),
        body: testSubmissionData
      })
    })
  })

  describe('When fetch errors', () => {
    beforeEach(async () => {
      fetch.mockImplementation(() => {
        throw new Error('fetch error')
      })
      result = await sendRequest(testSubmissionData, testRegDataVersion)
    })

    it('Should catch the error', () => {
      expect(result.message).toBe('fetch error')
    })
  })

  describe('When DOUBLE_MODE is set', () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = true
      registrationDouble.mockImplementation(() => {
        return 'double response'
      })
      result = await sendRequest(testSubmissionData, testRegDataVersion)
    })

    afterEach(() => {
      process.env.DOUBLE_MODE = false
    })

    it('should return double response', () => {
      expect(result).toBe('double response')
    })
  })
})
