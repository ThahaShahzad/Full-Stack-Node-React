import redis from 'redis'
import Settings from '../../settings.json'

const client = redis.createClient({
  port: Settings.RedisPort,
  host: Settings.RedisHost
})

client.on('connect', () => {
  console.log('Client connected to redis...')
})

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...')
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
