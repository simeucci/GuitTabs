// const Promise = require('bluebird')
// const bcrypt = Promise.promisifyAll(require('bcrypt'))
const bcrypt = require('bcrypt')

async function hashPassword (user) {
  const SALT_FACTOR = 8
  if (!user.changed('password')) {
    return
  }
  // console.log('hashPassword was run')
  const hashPassword = await bcrypt
    .genSalt(SALT_FACTOR)
    .then((salt) => bcrypt.hash(user.password, salt, null))
    .then((hash) => user.setDataValue('password', hash))
  return hashPassword
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  },
  {
    hooks: {
      beforeSave: hashPassword
    }
  })
  User.prototype.comparePassword = function (password) {
    // return bcrypt.compareAsync(password, this.password)
    return bcrypt.compareSync(password, this.password)
  }

  User.associate = function (models) {
    models.User.hasMany(models.UserSong_, { foreignKey: 'UserId' })
    // models.User.hasMany(models.Recent, { foreignKey: 'UserId' })
  }

  return User
}
