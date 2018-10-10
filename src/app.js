import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import config from './config'
import {createRouter} from './router'

export default function createApp() {
  const app = express()

  app.enable('trust proxy', 1)
  app.disable('x-powered-by')

  if (config.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
  }

  // Limit to 10mb if HTML has e.g. inline images
  app.use(bodyParser.text({ limit: '4mb', type: 'text/html' }))
  app.use(bodyParser.json({ limit: '4mb' }))

  const router = createRouter()
  app.use('/', router)

  return app
}
