<template>
  <div id='app'>
    <ControlBar v-on:sort=""
      v-on:clear="$emit"
      v-on:search="$emit()"
    />
    <Table />
  </div>
</template>

<script>
import Table from './components/Table'
import ControlBar from './components/ControlBar'

export default {
  name: 'App',
  components: {
    Table,
    ControlBar
  },
  async mounted () {
    this.$store.dispatch('fetchUsers')
  }
}
</script>

<style scoped>
#app {
  margin: 1rem;
}
</style>
