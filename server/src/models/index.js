const fs = require('fs')
const path = require('path')
const SequelizeLib = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new SequelizeLib(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, SequelizeLib)
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = SequelizeLib

db.User.belongsToMany(db.Song, { through: db.UserSong_ })
db.Song.belongsToMany(db.User, { through: db.UserSong_ })

module.exports = db
