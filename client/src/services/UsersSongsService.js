import Api from './Api'

export default {
  index (params) {
    return Api().get('usersongs', {
      params
    })
  },
  post (params) {
    return Api().post('usersongs', {
      params
    })
  },
  delete (params) {
    return Api().post('usersongs_del', {
      params
    })
  }
}
