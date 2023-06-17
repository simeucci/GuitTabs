module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    titolo: DataTypes.STRING,
    artista: DataTypes.STRING,
    genere: DataTypes.STRING,
    album: DataTypes.STRING,
    albumImageUrl: DataTypes.STRING,
    youtubeId: DataTypes.STRING,
    lyrics: DataTypes.TEXT,
    tab: DataTypes.TEXT,
    accordi: DataTypes.TEXT,
    midifile: DataTypes.STRING
  })

  Song.associate = function (models) {
    models.Song.hasMany(models.UserSong_, { foreignKey: 'SongId' })
    // models.Song.hasMany(models.Recent, { foreignKey: 'SongId' })
  }

  return Song
}
