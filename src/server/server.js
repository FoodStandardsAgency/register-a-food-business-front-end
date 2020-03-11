require('dotenv').config()

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const { info } = require('winston')
const routes = require('./routes')
const { Next } = require('./next')
const { errorHandler } = require('./middleware/errorHandler')

module.exports = async dbUrl => {
  const app = express()
  const storeOptions = {}
  if (dbUrl) {
    info('Server: setting session cache to database')
    storeOptions.store = new MongoStore({
      url: dbUrl
    })
    info('Server: successfully set up database connection')
  } else {
    info('Server: setting session cache to memory')
  }

  const sessionOptions = {
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // Session cookie set to expire after 24 hours
      maxAge: 86400000,
      httpOnly: true
    }
  }

  if (process.env.COOKIE_SECURE === 'true') {
    sessionOptions.cookie.secure = true
  }
  const limiter = rateLimit({
    max: process.env.RATE_LIMIT // limit each IP to x requests per minute
  })

  const options = Object.assign(sessionOptions, storeOptions)
  app.set('trust proxy', 1)
  app.enable('trust proxy')

  app.use(limiter)
  app.use(session(options))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  await Next.prepare()

  app.use(routes())
  app.use(errorHandler)

  return app
}
