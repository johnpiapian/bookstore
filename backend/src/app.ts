import express from 'express'
import routes from './routes'
import { errorHandler } from './common/ErrorHandler'
import { NotFoundException } from './common/CustomException'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => res.send('welcome to backend'))
app.use('/api', routes)
app.use((_req, _res) => {
  throw new NotFoundException('The requested resource was not found')
})
app.use(errorHandler)

export default app
