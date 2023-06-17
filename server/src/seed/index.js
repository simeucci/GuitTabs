const {
  sequelize,
  Song,
  User,
  UserSong_
} = require('../models')

const Promise = require('bluebird')
const songs = require('./songs.json')
const users = require('./users.json')
const UsersSongsJson = require('./usersong_s.json')

sequelize.sync({ force: true })
  .then(
    async function () {
      await Promise.all(
        users.map(
          user => {
            User.create(user)
            return user
          }
        )
      )
      await Promise.all(
        songs.map(
          song => {
            Song.create(song)
            return song
          }
        )
      )
    }
  )
  .then(
    setTimeout(function () {
      UsersSongsJson.map(
        usersong_ => {
          UserSong_.create(usersong_)
          return usersong_
        }
      )
    }, 1000)
  )
