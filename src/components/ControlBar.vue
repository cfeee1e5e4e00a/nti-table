<template>
  <div class="controlbar">
    <button type="button" class="btn btn-primary" v-on:click="sort">Сортировать</button>
    <button type="button" class="btn btn-primary" v-on:click="clear">Очистить</button>
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
</template>

<script>
import { BIconSearch } from 'bootstrap-vue'

export default {
  components: {
    BIconSearch
  }
}
</script>

<style scoped>
.controlbar {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#search {
  margin-right: 0;
}

input {
  margin-right: 15px;
}

button {
  margin-right: 15px;
}

</style>
