import app from './app'
import { PORT } from './config'
import Logger from './core/Logger'

app.listen(PORT || 8000, () => {
  Logger.info(`Server listening on port ${PORT}`)
})
