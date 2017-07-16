<template>
  <div id="app">
    <header><h4>ZCash Mine Field</h4></header>
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
  font-size: 1.3rem;
}

body {
  background: #002b36;
  color: #839496;

  font-size: 12px;
  font-family: 'Consolas', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ul, li {
  list-style-type: none;
  padding: 0;
}

header {
  text-align: center;
  background: #073642;
  overflow: hidden;
}

.card {
  background: #073642;
  padding: 0.5rem;
  margin: 0.5rem;
}
</style>
