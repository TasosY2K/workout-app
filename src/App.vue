<template>
  <div id="app">
    <div id="nav">
      <router-link to="/panel">Panel</router-link> /
      <router-link to="/overview">Overview</router-link> /
      <a href="javascript:void(0);" @click="logout">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      window.localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
