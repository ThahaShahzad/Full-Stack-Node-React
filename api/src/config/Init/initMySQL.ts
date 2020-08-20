import { Sequelize } from 'sequelize'
import Config from '..'

const sequelize = new Sequelize(
  Config.Env.DataBase.MYSQL_DB_NAME,
  Config.Env.DataBase.MYSQL_DB_USERNAME,
  Config.Env.DataBase.MYSQL_DB_PASSWORD,
  {
    host: Config.Env.DataBase.MYSQL_DB_HOST,
    dialect: 'mysql'
  }
)
const initMySQL = async () => {
  try {
    await sequelize.authenticate()
    console.log('MySQL Connected.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
initMySQL()
