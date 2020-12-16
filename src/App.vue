<template>
  <div id='app'>
    <ControlBar />
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
