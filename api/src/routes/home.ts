import express from 'express'
import JWT from '../config/Jwt/jwtGen'
import Config from '../config/enviormentVariables'
import Settings from '../settings.json'

export const HomeRoutes = express.Router()

HomeRoutes.get('/', JWT.verifyAccessToken, async (req, res, next) => {
  res.send({
    name: Settings.ProjectName,
    version: Settings.ProjectVersion,
    port: Config.server.PORT
  })
})
