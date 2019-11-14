export const state = () => ({
  varAccessToken: '',
  varRefreshToken: '',
  varExpire: '',
  varUUID: ''
})

export const mutations = {
  setAccessToken(state, param) {
    state.varAccessToken = param
  },
  setRefreshToken(state, param) {
    state.varRefreshToken = param
  },
  setExpireToken(state, param) {
    state.varExpire = param
  },
  setUUID(state, param) {
    state.varUUID = param
  }
}

export const actions = {
  processLogin({ dispatch, commit }, { idPengguna, kataSandi }) {
    this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
      'post'
    ])
    this.$axios.setHeader(
      'Authorization',
      'Basic NjkwMzNkYjgtMzEzMi00YjA0LWE2MzUtZWY4ZGM2OTY4YjNlOg=='
    )
    const data = {
      grant_type: 'password',
      username: idPengguna,
      password: kataSandi
    }
    const querystring = require('querystring')
    const postData = querystring.stringify(data)
    return this.$axios
      .$post('https://betelgeuse.gudangada.com/oauth/token', postData)
      .catch(function(e) {
        return e.response
      })
  },
  processUUID() {
    this.$axios.setHeader('Accept', 'application/vnd.api+json')
    this.$axios.setHeader('Content-Type', 'application/vnd.api+json')
    this.$axios.setHeader(
      'Authorization',
      'Bearer ' + this.$cookies.get('cookie_tokenAccess')
    )
    return this.$axios
      .$get('https://betelgeuse.gudangada.com/jsonapi')
      .catch(function(e) {
        return e.response
      })
  },
  processUserDetail(context) {
    this.$axios.setHeader('Accept', 'application/vnd.api+json')
    this.$axios.setHeader('Content-Type', 'application/vnd.api+json')
    this.$axios.setHeader(
      'Authorization',
      'Bearer ' + this.$cookies.get('cookie_tokenAccess')
    )
    return this.$axios
      .$get('jsonapi/user/user/' + context.state.varUUID + '?include=roles')
      .catch(function(e) {
        return e.response
      })
  }
}
