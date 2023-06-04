const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/)
    })
    const { error } = schema.validate(req.body)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'L\'indirizzo email non è valido. Controllare!'
          })
          break
        case 'password':
          res.status(400).send({
            error: `La password non soddisfa le seguenti regole:
            <ol>
            <li>Deve contenere ESCLUSIVAMENTE lettere minuscole, maiuscole e cifre</li>
            <li>Deve avere una lunghezza inclusa fra 8 e 32 caratteri
            </ol>
            `
          })
          break
        default:
          console.log(req.body.toJSON())
          res.status(400).send({
            error: 'Dati di registrazione non validi. Controllare!'
          })
      }
    } else {
      next()
    }
  }
}
