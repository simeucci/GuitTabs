const { Song } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const songs = await Song.findAll({
        limit: 10
      })
      res.send(songs)
    } catch (err) {
      // console.log(err)
      res.status(500).send({
        error: 'E\' occorso un errore durante il recupero dei brani. Controllare!'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'E\' occorso un errore durante la creazione del brano. Controllare!'
      })
    }
  },
  async put (req, res) {
    try {
      await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'E\' occorso un errore durante l\'aggiornamento del brano. Controllare!'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findByPk(req.params.songId)
      res.send(song)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'E\' occorso un errore durante il recupero del singolo brano. Controllare!'
      })
    }
  }
}
