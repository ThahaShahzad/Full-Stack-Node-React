import * as dotenv from 'dotenv'
dotenv.config()

const SERVER_PORT = process.env.PORT || 5000
const MONGO_DB_URI = process.env.MONGO_DB_URI || ''
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || ''
const REDIS_URI = process.env.REDIS_URI || ''
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME || ''
const MYSQL_DB_USERNAME = process.env.MYSQL_DB_USERNAME || ''
const MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD || ''
const MYSQL_DB_HOST = process.env.MYSQL_DB_HOST || ''
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ''
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ''

export default {
  server: {
    PORT: SERVER_PORT
  },
  DataBase: {
    MONGO_DB_URI: MONGO_DB_URI,
    MONGO_DB_NAME: MONGO_DB_NAME,
    REDIS_URI: REDIS_URI,
    REDIS_PASSWORD: REDIS_PASSWORD,
    MYSQL_DB_NAME: MYSQL_DB_NAME,
    MYSQL_DB_USERNAME: MYSQL_DB_USERNAME,
    MYSQL_DB_PASSWORD: MYSQL_DB_PASSWORD,
    MYSQL_DB_HOST: MYSQL_DB_HOST
  },
  JWT: {
    AccessToken: ACCESS_TOKEN_SECRET,
    RefreshToken: REFRESH_TOKEN_SECRET
  }
}
