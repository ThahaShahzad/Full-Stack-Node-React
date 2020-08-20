import express from 'express'
import createError from 'http-errors'
import User from '../models/user'
import { AuthSchema } from '../config/Validation/auth'
import JWT from '../config/Jwt/jwtGen'
import client from '../config/Init/initRedis'

export default {
  register: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      // const { email, password } = req.body
      // if (!email || !password) throw createError.BadRequest()
      const result = await AuthSchema.validateAsync(req.body)

      const doesExist = await User.findOne({ email: result.email })
      if (doesExist) throw new createError.Conflict(`${result.email} is already been registered`)

      const user = new User(result)
      const savedUser = await user.save()
      // const accessToken = await JWT.signAccessToken(savedUser.id)
      // const refreshToken = await JWT.signRefreshToken(savedUser.id)

      res.send({ savedUser })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { email, password } = req.body
      if (!email || !password) throw new createError.BadRequest()
      //const result = await AuthSchema.validateAsync(req.body)
      const user = await User.findOne({ email: email })
      if (!user) throw new createError.NotFound('User not registered')

      const isMatch = await user.isValidPassword(password)
      if (!isMatch) throw new createError.Unauthorized('Username/password not valid')

      const accessToken = await JWT.signAccessToken(user.id)
      const refreshToken = await JWT.signRefreshToken(user.id)

      res.cookie('accessToken', accessToken, { httpOnly: true })
      res.cookie('refreshToken', refreshToken, { httpOnly: true })
      res.send({ accessToken, refreshToken })
    } catch (error) {
      if (error.isJoi === true) return next(new createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },

  refreshToken: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw new createError.BadRequest()
      const userId = await JWT.verifyRefreshToken(refreshToken)

      const accessToken = await JWT.signAccessToken(userId)
      const refToken = await JWT.signRefreshToken(userId)

      res.cookie('accessToken', accessToken, { httpOnly: true })
      res.cookie('refreshToken', refToken, { httpOnly: true })
      res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw new createError.BadRequest()
      const userId = await JWT.verifyRefreshToken(refreshToken)
      client.RedisClient.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw new createError.InternalServerError()
        }
        console.log(val)
        res.sendStatus(204)
      })
    } catch (error) {
      next(error)
    }
  }
}
