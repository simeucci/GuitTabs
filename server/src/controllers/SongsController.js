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
  }
}
