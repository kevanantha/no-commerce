import express from 'express'

import * as helloController from './controllers/hello-controller'

export function createRouter() {
  const router = express.Router()

  router.get('/', helloController.index)

  return router
}
