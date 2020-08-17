import express from 'express'
import JWT from 'jsonwebtoken'
import createError from 'http-errors'
import client from '../Init/initRedis'
import Config from '..'

export default {
  signAccessToken: (userId: string) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = Config.Env.JWT.AccessToken
      const options = {
        expiresIn: '1h',
        issuer: 'pickurpage.com',
        audience: userId
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(new createError.InternalServerError())
          return
        }
        resolve(token)
      })
    })
  },
  verifyAccessToken: (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.headers['authorization']) return next(new createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, Config.Env.JWT.AccessToken, (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(new createError.Unauthorized(message))
      }
      req.payload = payload
      next()
    })
  },
  signRefreshToken: (userId: string) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = Config.Env.JWT.RefreshToken
      const options = {
        expiresIn: '1y',
        issuer: 'pickurpage.com',
        audience: userId
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(new createError.InternalServerError())
        }
        client.RedisClient.SET(userId, token!, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            console.log(err.message)
            reject(new createError.InternalServerError())
            return
          }
          resolve(token)
        })
      })
    })
  },
  verifyRefreshToken: async (refreshToken: string) => {
    return new Promise<string>((resolve, reject) => {
      JWT.verify(refreshToken, Config.Env.JWT.RefreshToken, (err, payload) => {
        if (err) return reject(new createError.Unauthorized())
        const userId = (payload as any).aud
        client.RedisClient.GET(userId, (err, result) => {
          if (err) {
            console.log(err.message)
            reject(new createError.InternalServerError())
            return
          }
          if (refreshToken === result) return resolve(userId)
          reject(new createError.Unauthorized())
        })
      })
    })
  }
}
