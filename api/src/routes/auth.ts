import express from 'express'
import AuthController from '../controllers/auth'

export const AuthRoutes = express.Router()

AuthRoutes.post('/register', AuthController.register)

AuthRoutes.post('/login', AuthController.login)

AuthRoutes.post('/refresh-token', AuthController.refreshToken)

AuthRoutes.delete('/logout', AuthController.logout)
