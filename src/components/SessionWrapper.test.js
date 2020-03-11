import SessionWrapper from '../components/SessionWrapper'
import renderer from 'react-test-renderer'

const ExampleComponent = () => (
  <div>
    <h1>A title</h1>
    <p>Some paragraph text</p>
  </div>
)

const comprehensiveReqSessionObject = {
  query: '',
  url: '/',
  session: {
    cumulativeFullAnswers: { example: 'answer' },
    transformedData: { transformed: 'data' },
    validatorErrors: { fieldName: 'error' },
    switches: { switchName: true },
    fsaRegistrationNumber: '1234567890',
    submissionDate: '01 Jan 2018',
    emailFbo: { success: true, recipient: 'fbo@example.com' },
    lcConfig: { example: 'data' },
    council: 'cardiff',
    addressLookups: { test: [] },
    browser: 'Chrome',
    browserVersion: '70.1.12',
    isBrowserSupported: true,
    isBrowserVersionVerified: true,
    country: 'wales'
  }
}

const emptyReqSessionObject = {
  query: '',
  url: '/',
  session: {}
}

let initialProps
let componentProps
const WrappedComponent = SessionWrapper(ExampleComponent)

describe('<SessionWrapper />', () => {
  it('returns the same component that it is passed', () => {
    const treeWrapped = renderer.create(<WrappedComponent />).toJSON()
    const treeOriginal = renderer.create(<ExampleComponent />).toJSON()
    expect(JSON.stringify(treeOriginal)).toEqual(JSON.stringify(treeWrapped))
  })

  describe('Props that come from the session DB', () => {
    describe('given that comprehensive session data is passed as part of the req object', () => {
      beforeEach(() => {
        initialProps = WrappedComponent.getInitialProps({
          req: comprehensiveReqSessionObject
        })
        componentProps = WrappedComponent(initialProps).props
      })

      it('should return the complete session data as part of the initial props, and passes those to the resulting child component', () => {
        for (let dataItem in comprehensiveReqSessionObject.session) {
          expect(initialProps[dataItem]).toEqual(
            comprehensiveReqSessionObject.session[dataItem]
          )

          expect(componentProps[dataItem]).toEqual(
            comprehensiveReqSessionObject.session[dataItem]
          )
        }
      })
    })

    describe('given that zero session data is passed as part of the req object', () => {
      beforeEach(() => {
        initialProps = WrappedComponent.getInitialProps({
          req: emptyReqSessionObject
        })

        componentProps = WrappedComponent(initialProps).props
      })

      it('returns empty values of a valid type for each possible item as part of the initial props, and passes those to the resulting child component', () => {
        for (let dataItem in comprehensiveReqSessionObject.session) {
          expect(typeof initialProps[dataItem]).toEqual(
            typeof comprehensiveReqSessionObject.session[dataItem]
          )

          expect(initialProps[dataItem]).not.toEqual(
            comprehensiveReqSessionObject.session[dataItem]
          )

          expect(typeof componentProps[dataItem]).toEqual(
            typeof comprehensiveReqSessionObject.session[dataItem]
          )

          expect(componentProps[dataItem]).not.toEqual(
            comprehensiveReqSessionObject.session[dataItem]
          )
        }
      })
    })
  })

  describe('Props that do not come from the session DB', () => {
    describe('the editModeFirstPage value', () => {
      describe('given a url query that includes an edit value', () => {
        beforeEach(() => {
          const reqObjectWithEditQuery = {
            query: { edit: 'some-page' },
            url: '/'
          }
          initialProps = WrappedComponent.getInitialProps({
            req: reqObjectWithEditQuery
          })
        })

        it('returns editModeFirstPage as the correct value', () => {
          expect(initialProps.editModeFirstPage).toBe('/some-page')
        })
      })

      describe('given a url query that does not include an edit value', () => {
        beforeEach(() => {
          const reqObjectWithoutEditQuery = {
            query: { some_other_query: 'value' },
            url: '/'
          }
          initialProps = WrappedComponent.getInitialProps({
            req: reqObjectWithoutEditQuery
          })
        })

        it('returns editModeFirstPage as undefined', () => {
          expect(initialProps.editModeFirstPage).toBe(undefined)
        })
      })
    })

    describe('the formAction value', () => {
      describe('given req.url is /west-dorset/operator-name', () => {
        describe('given that req.query.edit is truthy', () => {
          beforeEach(() => {
            const reqObjectWithUrlAndEdit = {
              url: '/west-dorset/operator-name',
              query: { edit: 'some-edit-page' }
            }
            initialProps = WrappedComponent.getInitialProps({
              req: reqObjectWithUrlAndEdit
            })
          })

          it('should return initialProps that contains a formAction value of /edit/continue/operator-name', () => {
            expect(initialProps.formAction).toBe('/edit/continue/operator-name')
          })
        })

        describe('given that req.query.edit is falsy', () => {
          beforeEach(() => {
            const reqObjectWithUrlWithoutEdit = {
              url: '/west-dorset/operator-name',
              query: {}
            }
            initialProps = WrappedComponent.getInitialProps({
              req: reqObjectWithUrlWithoutEdit
            })
          })

          it('should return initialProps that contains a formAction value of /continue/operator-name', () => {
            expect(initialProps.formAction).toBe('/continue/operator-name')
          })
        })
      })

      describe('given req.url is /west-dorset/another-page', () => {
        beforeEach(() => {
          const reqObjectWithUrlAndEdit = {
            url: '/west-dorset/another-page',
            query: { edit: 'some-edit-page' }
          }
          initialProps = WrappedComponent.getInitialProps({
            req: reqObjectWithUrlAndEdit
          })
        })

        it('should return initialProps that contains a formAction value that includes the string another-page', () => {
          expect(initialProps.formAction.includes('another-page')).toBe(true)
        })
      })
    })

    describe('the acceptAllCookies value', () => {
      describe('given that the req.cookies object contains acceptAllCookies', () => {
        beforeEach(() => {
          const reqObjectWithAcceptCookies = {
            url: '/',
            cookies: { acceptAllCookies: true }
          }
          initialProps = WrappedComponent.getInitialProps({
            req: reqObjectWithAcceptCookies
          })
        })

        it('returns acceptAllCookies as the correct value', () => {
          expect(initialProps.acceptAllCookies).toBe(true)
        })
      })

      describe('given that the req.cookies object does not contain acceptAllCookies', () => {
        beforeEach(() => {
          const reqObjectWithoutAcceptCookies = {
            url: '/',
            cookies: { some_other_cookie: true }
          }

          initialProps = WrappedComponent.getInitialProps({
            req: reqObjectWithoutAcceptCookies
          })
        })

        it('returns acceptAllCookies as undefined', () => {
          expect(initialProps.acceptAllCookies).toBe(undefined)
        })
      })
    })
  })
})
