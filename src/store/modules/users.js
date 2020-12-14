export default {
  actions: {
    async fetchUsers (ctx) {
      const res = await fetch('http://localhost:1488/api/randoms')
      const users = await res.json()

      ctx.commit('updateUsers', users.users)
    }
  },
  mutations: {
    updateUsers (state, users) {
      state.users = users
    },
    clearUsers (state, users) {

    }
  },
  state: {
    users: []
  },
  getters: {
    allUsers (state) {
      return state.users
    }
  }
}
