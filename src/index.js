import dotenv from 'dotenv'
import enableDestroy from 'server-destroy'

import createApp from './app'
import config from './config'
import loggerUtil from './utils/logger'

dotenv.config()

const logger = loggerUtil(__filename)

const app = createApp()
const server = app.listen(config.PORT, () => {
  logger.log({
    level: 'info',
    message: `Express server listening on http://localhost:${
      config.PORT
    } in ${app.get('env')}`
  })
})
enableDestroy(server)

function closeServer(signal) {
  logger.log({
    level: 'info',
    message: `${signal} received`
  })
  logger.log({
    level: 'info',
    message: 'Closing http server ...'
  })
  server.destroy()
}

process.on('SIGTERM', closeServer.bind(this, 'SIGTERM'))
process.on('SIGINT', closeServer.bind(this, 'SIGINT(Ctrl-C)'))

server.on('close', () => {
  logger.log({
    level: 'info',
    message: 'Server closed'
  })
  process.emit('cleanup')

  logger.log({
    level: 'info',
    message: 'Giving 100ms time to cleanup...'
  })
  setTimeout(process.exit, 100)
})
