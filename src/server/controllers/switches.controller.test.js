jest.mock('../services/session-management.service')
jest.mock('../services/switches.service')

const switchesController = require('./switches.controller')
const { changeSwitch } = require('../services/switches.service')
const {
  cleanEmptiedAnswers
} = require('../services/session-management.service')

const examplePreviousAnswers = {
  answer: 'answer-pathAnswer'
}
const exampleNewAnswers = { newAnswer: 'example' }
const exampleCurrentPage = '/mock-page-1'

describe('Function: switchController: ', () => {
  let result
  beforeEach(() => {
    cleanEmptiedAnswers.mockImplementation(
      (previousAnswers, newAnswersArray) =>
        newAnswersArray.length > 0
          ? Object.assign({}, previousAnswers, newAnswersArray)
          : null
    )

    changeSwitch.mockImplementation(() => true)
  })

  it('Should return a newSwitchState value', () => {
    result = switchesController(
      false,
      'on',
      examplePreviousAnswers,
      undefined,
      exampleCurrentPage
    )
    expect(result.newSwitchState).toEqual(true)
  })

  describe('When there are no new answers on the originator page: ', () => {
    it('Should return the same answers as input', () => {
      result = switchesController(
        false,
        'on',
        examplePreviousAnswers,
        undefined,
        exampleCurrentPage
      )
      expect(result.cumulativeFullAnswers).toEqual(examplePreviousAnswers)
    })
  })

  describe('When there are new answers on the originator page: ', () => {
    it('Should return a new cumulativeFullAnswers', () => {
      result = switchesController(
        false,
        'on',
        examplePreviousAnswers,
        { newAnswer: 'example' },
        exampleNewAnswers
      )
      expect(result.cumulativeFullAnswers.newAnswer).toBe('example')
    })
  })

  describe('When a service throws an error', () => {
    beforeEach(() => {
      changeSwitch.mockImplementation(() => {
        throw new Error('Some error')
      })

      try {
        result = switchesController(
          false,
          'on',
          examplePreviousAnswers,
          { newAnswer: 'example' },
          exampleNewAnswers
        )
      } catch (err) {
        result = err
      }
    })

    it('Should throw the error', () => {
      expect(result.message).toBe('Some error')
    })
  })
})
