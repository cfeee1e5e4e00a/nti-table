<template>
  <div class="container">
    <div class="queue">
      <ul class="list-group">
        <li class="list-group-item" v-for="rule in queue">
          <a>{{ fields[rule.field] + ' : ' + filters[rule.filter] }}</a>
          <div class="buttons">
            <button class="btn btn-outline-primary" id="up">
              <b-icon-arrow-up></b-icon-arrow-up>
            </button>
            <button class="btn btn-outline-primary" id="down">
              <b-icon-arrow-down></b-icon-arrow-down>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="controlbar">
      <div class="buttons">
        <button type="button" class="btn btn-primary" id="sort" v-on:click="sort">Сортировать</button>
        <button type="button" class="btn btn-primary" id="clear" v-on:click="clear">Очистить</button>
      </div>
      <div class="search">
        <div class="input-group">
          <input type="text"
            class="form-control"
            placeholder="Поиск"
            aria-describedby="search"
            id="search-request"
          >
        </div>
        <button type="button"
          class="btn btn-outline-primary"
          v-on:click="search"
        ><b-icon-search></b-icon-search></button>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconSearch, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

export default {
  data () {
    return {
      fields: {
        color: 'Индекс',
        id: 'Id',
        name: 'Имя',
        surname: 'Фамилия',
        sex: 'Пол',
        age: 'Возраст',
        country: 'Место жительства',
        lastSeen: 'Последний онлайн',
        education: 'Образование',
        workExp: 'Опыт работы',
        avatar: 'Аватар',
        interests: 'Интересы',
        subscriptions: 'Подписки',
        friendsCount: 'Друзья',
        subscribersCount: 'Подписчики',
        phone: 'Телефон',
        email: 'Email'
      },
      filters: {
        asc: 'по возр.',
        desc: 'по убыв.',
        red: 'красн.',
        green: 'зелен.',
        blue: 'синий',
        man: 'муж.',
        woman: 'жен.',
        nospec: 'не указ.'
      }
    }
  },
  methods: {
    sort () {
      this.$store.commit('sortUsers')
    },
    clear () {
      this.$store.commit('clear')
    },
    search () {
      this.$store.commit('searchUsers')
    }
  },
  computed: {
    queue () {
      return this.$store.getters.queue
    }
  },
  components: {
    BIconSearch,
    BIconArrowUp,
    BIconArrowDown
  }
}
</script>

<style scoped>
.container {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.controlbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.buttons {
  width: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.search {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}

.list-group-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

a {
  margin: 5px;
}

#sort {
  margin-right: 15px;
}

#search-request {
  margin-right: 15px;
}

#up {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
