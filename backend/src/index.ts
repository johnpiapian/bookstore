import app from './app'
import { establishDbConnection } from './data/connect'
import config from '../config/default'

establishDbConnection(config.MONGODB_URI)
  .then(() => {
    console.log('Database connection established')
    app.listen(config.PORT, () => {
      console.log(`Server is running on http://localhost:${config.PORT}`)
    })
  })
  .catch(() => {
    process.exit(1)
  })
