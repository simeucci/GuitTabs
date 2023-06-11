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
  return Song
}
