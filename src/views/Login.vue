<template>
  <div class="login col-md-6 offset-md-3">
    <input class="form-control" type="text" placeholder="Username" v-model="username" />
    <br />
    <button class="btn btn-dark" @click="login">Login as {{ username }}</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {
      window.localStorage.setItem("access", this.username);
      location.reload();
    },
  },
  mounted() {
    if (window.localStorage.getItem("access")) {
      this.$router.push({ name: "Home" });
    }
  },
  data() {
    return {
      username: null,
    };
  },
};
</script>

<style scoped>
.login {
  text-align: center;
}
</style>
