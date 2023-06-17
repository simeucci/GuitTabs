module.exports = (sequelize, DataTypes, User, Song) => {
  const UserSong_ = sequelize.define(
    'UserSong_',
    {
      UserId: DataTypes.INTEGER,
      SongId: DataTypes.INTEGER,
      data_creazione: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )

  UserSong_.associate = function (models) {
    console.log('Parte UserSong_.associate')
    models.User.belongsToMany(models.Song, { through: UserSong_ })
    models.Song.belongsToMany(models.User, { through: UserSong_ })
  }

  return UserSong_
}
