<template>
  <div id='app'>
    <Table />
  </div>
</template>

<script>
import Table from './components/Table'

export default {
  name: 'App',
  components: {
    Table
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
