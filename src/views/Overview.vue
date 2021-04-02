<template>
  <div class="overview container" v-if="stored">
    <h1>{{ stored.username }}</h1>
    <line-chart v-if="stored.exercises" :chartdata="chartdata" />
    <h4 v-else class="mt-2">No exercises found</h4>
  </div>
</template>
<script>
import LineChart from "@/components/Chart.vue";

export default {
  name: "Overview",
  components: { LineChart },
  data() {
    return {
      stored: null,
      chartdata: {
        labels: null,
        datasets: [
          {
            label: "Exercises per session",
            type: "line",
            data: null,
            backgroundColor: "rgba(31,222,100,.5)",
            borderColor: "#030812",
            borderWidth: 1,
          },
        ],
      },
    };
  },
  mounted() {
    if (!window.localStorage.getItem("access")) {
      this.$router.push({ name: "Login" });
    } else {
      if (!window.localStorage.getItem("exercises")) {
        this.stored = {
          username: window.localStorage.getItem("access"),
        };
      } else {
        this.stored = {
          username: window.localStorage.getItem("access"),
          exercises: JSON.parse(window.localStorage.getItem("exercises")),
        };
        this.chartdata.labels = this.stored.exercises.exercises.map(
          (a) => a.time
        );
        this.chartdata.datasets[0].data = this.stored.exercises.exercises.map(
          (a) => a.value
        );
      }
    }
  },
};
</script>
