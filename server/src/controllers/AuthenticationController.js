const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      // email già esistente
      res.status(400).send({
        error: 'Esiste già un account con questa email.'
      })
    }
    // const msg2 = ' Il tuo account è stato registrato correttamente.'
    // res.send({
    //    message: `Ciao ${req.body.email}!` + msg2
    // })
  },

  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'Dati di accesso incorretti (utente inesistente).'
        })
      }
      // const isPasswordValid = (password === user.password)
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Dati di accesso incorretti (password sbagliata).'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // email già esistente
      console.log(err)
      res.status(500).send({
        error: 'E\' occorso un errore durante l\'accesso. Controllare!'
      })
    }
    // const msg2 = ' Il tuo account è stato registrato correttamente.'
    // res.send({
    //    message: `Ciao ${req.body.email}!` + msg2
    // })
  }
}
