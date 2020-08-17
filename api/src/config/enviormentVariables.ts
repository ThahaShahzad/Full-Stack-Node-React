import * as dotenv from 'dotenv'
dotenv.config()

const SERVER_PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI || ''
const DB_NAME = process.env.DB_NAME || ''
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ''
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ''

export default {
  server: {
    port: SERVER_PORT
  },
  DataBase: {
    DB_URI: DB_URI,
    DB_NAME: DB_NAME
  },
  JWT: {
    AccessToken: ACCESS_TOKEN_SECRET,
    RefreshToken: REFRESH_TOKEN_SECRET
  }
}
