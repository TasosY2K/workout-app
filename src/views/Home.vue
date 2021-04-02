<template>
  <div class="home"></div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    if (window.localStorage.getItem("access")) {
      this.$router.push({ name: "Panel" });
    } else {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
