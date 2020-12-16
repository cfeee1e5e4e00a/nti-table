import { findWhere } from 'underscore/underscore-esm'

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
    sortUsers (state) {

    },
    addSortRule (state, rule) {
      const { field, filter } = rule
      const q = state.sortQueue

      if (filter === 'no') {
        const i = q.findIndex(i => i.field === field)
        q.splice(i, 1)
        return
      }

      if (typeof findWhere(q, { field }) === 'undefined') {
        q.push({ field, filter })
      } else {
        const i = q.findIndex(i => i.field === field)
        q[i].filter = filter
      }
    }
  },
  state: {
    users: [],
    sortQueue: []
  },
  getters: {
    allUsers (state) {
      return state.users
    },
    sortQueue (state) {
      return state.sortQueue
    }
  }
}
