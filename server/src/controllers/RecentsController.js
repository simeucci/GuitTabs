const { Recent, User, Song, Sequelize } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const { userId } = req.query
      let myRet = []
      const usr = await User.findOne({
        include: {
          model: Recent,
          attributes: ['data_ultimo_accesso'],
          include: {
            model: Song,
            attributes: ['id', 'titolo', 'artista']
          }
        },
        where: {
          id: userId
        },
        order: [[Recent, 'data_ultimo_accesso', 'DESC']]
      })
      if (usr.Recents.length) {
        myRet = usr.Recents.map((recent) => {
          return {
            id: recent.Song.id,
            titolo: recent.Song.titolo,
            artista: recent.Song.artista,
            data_ultimo_accesso: recent.data_ultimo_accesso
          }
        })
      }
      res.send(myRet)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'E\' occorso un errore durante il recupero delle songs recenti. Controllare!'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.body.params.userId
      const songId = req.body.params.songId
      const [recent, created] = await Recent.findOrCreate(
        {
          where: {
            UserId: userId,
            SongId: songId
          }
        }
      )
      if (!created && recent && recent.id) {
        await Recent.update(
          {
            data_ultimo_accesso: Sequelize.fn('NOW')
          },
          {
            where: {
              id: recent.id
            }
          }
        )
      }
      res.sendStatus(201)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'E\' occorso un errore durante la creazione del bookmark. Controllare!'
      })
    }
  }
}
