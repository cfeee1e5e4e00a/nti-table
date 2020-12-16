<template>
  <div>
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
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'color', name: 'Индекс', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'green', name: 'зелен.' }, { key: 'blue', name: 'синий' }, { key: 'red', name: 'красн.' }] },
        { key: 'id', name: 'Id', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'name', name: 'Имя', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'surname', name: 'Фамилия', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'sex', name: 'Пол', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'man', name: 'муж.' }, { key: 'woman', name: 'жен.' }, { key: 'nospec', name: 'не указ.' }] },
        { key: 'age', name: 'Возраст', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'country', name: 'Место жительства', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'lastSeen', name: 'Последний онлайн', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'education', name: 'Образование', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'workExp', name: 'Опыт работы', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
        { key: 'avatar', name: 'Аватар', filter: [{ key: 'no', name: 'не сорт.' }, { key: 'asc', name: 'по возр.' }, { key: 'desc', name: 'по убыв.' }] },
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
    users () {
      return this.$store.getters.users
    }
  }
}
</script>

<style scoped>
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
