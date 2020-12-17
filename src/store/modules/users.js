import { findWhere } from 'underscore/underscore-esm'

export default {
  actions: {
    async fetchUsers (ctx) {
      const res = await fetch('http://localhost:8080/api/randoms')
      const users = await res.json()

      ctx.commit('updateUsers', users.users)
    }
  },
  mutations: {
    searchUsers (state, request) {
      state.users = state.users.filter(user => {
        let result = false
        console.log(user)
        for (let field in user) {
          field = user[field]
          if (field.toLowerCase().search(request.toLowerCase()) !== -1) result = true
        }
        return result
      })
    },
    updateUsers (state, users) {
      state.savedUsers = users
      state.users = users
    },
    sortUsers (state) {
      const filters = {
        asc: 'по возр.',
        desc: 'по убыв.',
        red: 'red',
        green: 'green',
        blue: 'blue',
        man: 'Муж.',
        woman: 'Жен.',
        nospec: '-',
        haveava: 'Да',
        noava: 'Нет'
      }

      for (const rule of state.sortQueue) {
        const field = rule.field
        const filter = rule.filter

        if (field !== 'color' && field !== 'sex' && field !== 'avatar') {
          const compare = (a, b) => {
            let result
            if (field === 'lastSeen') {
              a = a.lastSeen
              b = b.lastSeen
              if (a === '-' && a !== b) { return rule.filter === 'asc' ? -1 : 1 }
              if (b === '-' && b !== a) { return rule.filter === 'asc' ? 1 : -1 }
              if (a === b && a === '-') { return 0 }
              a = `${a.substring(3, 5)}.${a.substring(0, 2)}.${a.substring(6, 10)}`
              b = `${b.substring(3, 5)}.${b.substring(0, 2)}.${b.substring(6, 10)}`
              result = Date.parse(a) - Date.parse(b)
            } if (field === 'id') {
              result = a.id - b.id
            } if (field === 'age') {
              result = a.age - b.age
            } if (field === 'friendsCount') {
              result = a.friendsCount - b.friendsCount
            } if (field === 'subscribersCount') {
              result = a.subscribersCount - b.subscribersCount
            } else {
              if (a[field] > b[field]) return rule.filter === 'asc' ? 1 : -1
              else if (a[field] < b[field]) return rule.filter === 'asc' ? -1 : 1
              else return 0
            }
            return rule.filter === 'asc' ? result : -result
          }

          state.users = state.users.map((item, index) => ({ item, index }))
            .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
            .map(({ item }) => item)
        } else {
          state.users = state.users.filter(u => {
            console.log(`${field}: ${u[field]} === ${filters[filter]}`)
            return u[field] === filters[filter]
          })
        }
      }

      state.sortQueue = []
    },
    moveSortRule (state, rule) {
      const q = state.sortQueue
      const field = rule.field
      const filter = rule.filter
      const direction = rule.direction

      const i = q.findIndex(i => i.field === field)
      if (direction === 'up') {
        const s = q[i - 1]
        q[i - 1] = { field, filter }
        q[i] = s
      }
      if (direction === 'down') {
        const s = q[i + 1]
        q[i + 1] = { field, filter }
        q[i] = s
      }
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
    },
    restoreUsers (state) {
      state.users = state.savedUsers
    }
  },
  state: {
    users: [],
    sortQueue: []
  },
  getters: {
    users (state) {
      return state.users
    },
    queue (state) {
      return state.sortQueue
    }
  }
}
