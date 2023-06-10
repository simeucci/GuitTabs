module.exports = (sequelize, DataTypes, User, Song) => {
  const UserSong_ = sequelize.define('UserSong_', {}, { timestamps: false })
  return UserSong_
}
