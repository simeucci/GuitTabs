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

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

module.exports = db
