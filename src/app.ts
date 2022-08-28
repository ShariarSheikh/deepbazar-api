import express from 'express'
import middleware from './middleware'

const app = express()

// middleware
app.use(middleware)

app.get('/', (_req, res) => {
  res.status(200).json({ name: 'Shariar' })
})

export default app
