const { UserSong_, User, Song } = require('../models')
// const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const { songId, userId } = req.query
      if ((typeof songId === 'undefined') || !songId) {
        let myRet = []
        const usersongs = await User.findOne({
          include: {
            model: Song,
            attributes: ['titolo', 'artista']
          },
          where: {
            id: userId
          },
          order: [
            [Song, UserSong_, 'data_creazione', 'DESC']
          ]
        })
        if (usersongs.Songs.length) {
          myRet = usersongs.Songs.map((song) => {
            return {
              id: song.UserSong_.SongId,
              titolo: song.titolo,
              artista: song.artista,
              titolo_artista: song.titolo + ' (' + song.artista + ')',
              data_creazione: song.UserSong_.data_creazione
            }
          })
        }
        res.send(myRet)
      } else {
        const usersong = await UserSong_.findOne({
          where: {
            UserId: userId,
            SongId: songId
          }
        })
        res.send(usersong)
      }
    } catch (err) {
      res.status(500).send({
        error: 'E\' occorso un errore durante il recupero del bookmark. Controllare!'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.body.params.userId
      const songId = req.body.params.songId
      await UserSong_.create(
        {
          UserId: userId,
          SongId: songId
        }
      )
      res.sendStatus(201)
    } catch (err) {
      res.status(500).send({
        error: 'E\' occorso un errore durante la creazione del bookmark. Controllare!'
      })
    }
  },
  async delete (req, res) {
    try {
      console.log(req)
      const userId = req.body.params.userId
      const songId = req.body.params.songId
      await UserSong_.destroy({
        where: {
          UserId: userId,
          SongId: songId
        }
      })
      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'E\' occorso un errore durante l\'eliminazione del bookmark. Controllare!'
      })
    }
  }
}
