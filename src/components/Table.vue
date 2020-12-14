<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <th v-for="field in fields">{{ field.name }}</th>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <th v-for="field in fields">
            {{ user[field.key] }}
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
      sortBy: [],
      fields: [
        { key: 'color', name: 'Индекс' },
        { key: 'id', name: 'Id' },
        { key: 'name', name: 'Имя' },
        { key: 'surname', name: 'Фамилия' },
        { key: 'sex', name: 'Пол' },
        { key: 'age', name: 'Возраст' },
        { key: 'country', name: 'Место жительства' },
        { key: 'lastSeen', name: 'Последний онлайн' },
        { key: 'education', name: 'Образование' },
        { key: 'workExp', name: 'Опыт работы' },
        { key: 'avatar', name: 'Аватар' },
        { key: 'interests', name: 'Интересы' },
        { key: 'subscriptions', name: 'Подписки' },
        { key: 'friendsCount', name: 'Друзья' },
        { key: 'subscribersCount', name: 'Подписчики' },
        { key: 'phone', name: 'Телефон' },
        { key: 'email', name: 'Email' }
      ]
    }
  },
  computed: {
    users () {
      return this.$store.getters.allUsers
    }
  }
}
</script>

<style scoped>

</style>
