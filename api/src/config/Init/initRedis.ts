import redis from 'redis'
import Config from '..'

const client = redis.createClient({
  url: Config.Env.DataBase.REDIS_URI,
  no_ready_check: true,
  auth_pass: Config.Env.DataBase.REDIS_PASSWORD
})

client.on('connect', () => {
  console.log('Redis Connected')
})

client.on('ready', () => {
  console.log('Redis Connected and ready to use')
})

client.on('error', (err) => {
  console.log(err.message)
})

client.on('end', () => {
  console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
  client.quit()
})

export default {
  RedisClient: client
}
