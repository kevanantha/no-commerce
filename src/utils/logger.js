import path from 'path'
import winston from 'winston'
import R from 'ramda'

import config from '../config'

export default function createLogger(filePath) {
  const fileName = path.basename(filePath)

  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        colorize: config.NODE_ENV === 'development',
        label: fileName,
        timestamp: true
      })
    ]
  })

  setLevelForTransports(logger, config.LOG_LEVEL || 'info')

  return logger
}

function setLevelForTransports(logger, level) {
  R.forEach(transport => {
    transport.level = level
  }, logger.transports)
}
