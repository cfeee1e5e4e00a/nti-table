<template>
  <div>
    <div v-if="savedUsers.length != 0">
      <table class="table table-bordered">
        <thead>
          <th v-for="field in fields">{{ field.name }}</th>
        </thead>
        <tbody>
          <tr>
            <th v-for="field in fields">
              <select class="form-select" v-bind:name="field.key" v-on:change="onSortChange">
                <option v-for="filter in field.filter" v-bind:value="filter.key">
                  {{ filter.name }}
                </option>
              </select>
            </th>
          </tr>
          <tr v-for="user in users">
            <th v-for="field in fields" v-bind:class="field.key === 'color' ? user[field.key] : field.key">
              {{ field.key === 'color' ? '' : user[field.key]  }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="loading">
      <img src="../assets/loading.gif">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'color', name: 'Индекс', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'green', name: 'green.' }, { key: 'blue', name: 'blue' }, { key: 'red', name: 'red.' }] },
        { key: 'id', name: 'Id', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'name', name: 'Имя', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'surname', name: 'Фамилия', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'sex', name: 'Пол', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'man', name: 'Муж.' }, { key: 'woman', name: 'Жен.' }, { key: 'nospec', name: '-' }] },
        { key: 'age', name: 'Возраст', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'country', name: 'Место жительства', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'lastSeen', name: 'Последний онлайн', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'education', name: 'Образование', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'workExp', name: 'Опыт работы', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'avatar', name: 'Аватар', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'haveava', name: 'Да' }, { key: 'noava', name: 'Нет' }] },
        { key: 'interests', name: 'Интересы', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'subscriptions', name: 'Подписки', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'friendsCount', name: 'Друзья', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'subscribersCount', name: 'Подписчики', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'phone', name: 'Телефон', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'email', name: 'Email', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] }
      ],
      sortQueue: []
    }
  },
  methods: {
    onSortChange (event) {
      const rule = { field: event.target.name, filter: event.target.value }
      this.$store.commit('addSortRule', rule)
    }
  },
  computed: {
    savedUsers () {
      return this.$store.getters.savedUsers
    },
    users () {
      return this.$store.getters.users
    }
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

img {
  margin-top: 150px;
  height: 96px;
  width: 96px;
}

.interests, .workExp, .subscriptions {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

.green {
  background-color: green;
}
</style>
