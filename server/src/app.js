const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) => {
  res.send({
    message: 'hello world!'
  })
})

app.post('/register', (req, res) => {
  res.send({
    message: `Ciao ${req.body.email}! Il tuo account è stato registrato correttamente`
  })
})

app.listen(process.env.PORT || 8081)
