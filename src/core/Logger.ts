import winston, { createLogger, format } from 'winston'
import { environment } from '../config'
const { timestamp, combine, printf, colorize } = format

const logLevels = environment === 'development' ? 'debug' : 'info'

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'black redBG',
    warn: 'black yellowBG',
    info: 'black greenBG',
    http: 'white cyanBG',
    debug: 'white',
  },
}

const winstonFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  colorize({ all: true }),
  printf((info) => `${info.timestamp}  ${info.level}  ${info.message}`)
)

winston.addColors(myCustomLevels.colors)
const winstonTransport = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winstonFormat,
    }),
  ],
})

export default createLogger({
  level: logLevels,
  levels: myCustomLevels.levels,
  transports: winstonTransport,
  exitOnError: false,
})
