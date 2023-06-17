const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js')
const SongsController = require('./controllers/SongsController.js')
const UsersSongsController = require('./controllers/UsersSongsController')
const RecentsController = require('./controllers/RecentsController')

module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
  app.get('/songs', SongsController.index)
  app.get('/songs/:songId', SongsController.show)
  app.post('/songs', SongsController.post)
  app.put('/songs/:songId', SongsController.put)
  app.get('/usersongs', UsersSongsController.index)
  app.post('/usersongs', UsersSongsController.post)
  app.post('/usersongs_del', UsersSongsController.delete)
  app.get('/recents', RecentsController.index)
  app.post('/recents', RecentsController.post)
}
