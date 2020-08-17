import express from 'express'
import morgan from 'morgan'
import Config from './config/index'
import Routes from './routes/index'
import './config/Init/initMongoDb'
import './config/Init/initRedis'

const startServer = () => {
  const app = express()
  app.use(morgan('dev'))
  app.use(express.json())
  app.use('/', Routes.HomeRoutes)
  app.use('/auth', Routes.AuthRoutes)
  app.use('/testdata', Routes.TestDataRoutes)
  app.use(Config.Errors.Error404)
  app.use(Config.Errors.ErrorHandlder)

  app.listen(Config.Env.server.port, () => console.log(`Server on => http://localhost:${Config.Env.server.port}`))
}

startServer()
