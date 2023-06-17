module.exports = (sequelize, DataTypes) => {
  const Recent = sequelize.define(
    'Recent',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      data_ultimo_accesso: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )

  Recent.associate = function (models) {
    models.User.belongsToMany(models.Song, { through: Recent })
    models.Song.belongsToMany(models.User, { through: Recent })
    models.User.hasMany(Recent)
    Recent.belongsTo(models.User)
    models.Song.hasMany(Recent)
    Recent.belongsTo(models.Song)
  }

  return Recent
}
