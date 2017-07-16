<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-size: 1.5rem;
}

body {
  background: #002b36;
  color: #839496;

  font-size: 12px;
  font-family: 'Consolas', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card {
  background: #073642;
  padding: 0.5rem;
  margin: 0.5rem;
}
</style>
