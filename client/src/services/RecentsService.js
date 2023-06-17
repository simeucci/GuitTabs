import Api from './Api'

export default {
  index (params) {
    return Api().get('recents', {
      params
    })
  },
  post (params) {
    return Api().post('recents', {
      params
    })
  }
}
