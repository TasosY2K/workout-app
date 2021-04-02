<template>
  <div class="panel" v-if="stored">
    <h1>{{ stored.username }}</h1>
    <button class="btn btn-primary" @click="$modal.show('inputModal')">
      Add Exercise
    </button>
    <download-csv
      class="btn btn-success ml-2"
      v-if="stored.exercises"
      :data="stored.exercises.exercises"
      >Export to CSV</download-csv
    >
    <div class="exercises container mt-3" v-if="stored.exercises">
      <v-table
        class="table table-striped"
        :data="stored.exercises.exercises"
        :currentPage.sync="currentPage"
        :pageSize="10"
        @totalPagesChanged="totalPages = $event"
      >
        <thead slot="head">
          <th>Name</th>
          <th>Type</th>
          <th>Value</th>
          <th>Time</th>
        </thead>
        <tbody slot="body" slot-scope="{ displayData }">
          <tr v-for="row in displayData" :key="row.guid">
            <td>{{ row.name }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.value }}</td>
            <td>{{ row.time }}</td>
          </tr>
        </tbody>
      </v-table>

      <smart-pagination
        :currentPage.sync="currentPage"
        :totalPages="totalPages"
      />
    </div>
    <h4 v-else class="mt-2">No exercises found</h4>
    <modal name="inputModal" class="modalInput" adaptive="true">
      <input
        type="text"
        class="form-control mt-5"
        placeholder="Exercise Name"
        v-model="exerciseName"
      />
      <select class="form-control mt-3" id="search-type" v-model="exerciseType">
        <option value="time_s">Time (Seconds)</option>
        <option value="time_m">Time (Minutes)</option>
        <option value="sets">Sets</option>
      </select>
      <input
        type="text"
        class="form-control mt-3"
        placeholder="Seconds"
        v-if="exerciseType == 'time_s'"
        v-model="exerciseValue"
      />
      <input
        type="text"
        class="form-control mt-3"
        placeholder="Minutes"
        v-if="exerciseType == 'time_m'"
        v-model="exerciseValue"
      />
      <input
        type="text"
        class="form-control mt-3"
        placeholder="Sets"
        v-if="exerciseType == 'sets'"
        v-model="exerciseValue"
      />
      <button class="btn btn-lg btn-success mt-3" @click="addExercise">
        Add
      </button>
    </modal>
  </div>
</template>
<script>
export default {
  name: "Panel",
  methods: {
    addExercise() {
      let oldCookie = JSON.parse(window.localStorage.getItem("exercises"));
      let newExercises = {
        name: this.exerciseName,
        type: this.exerciseType,
        value: this.exerciseValue,
        time: new Date().toLocaleString("el"),
      };

      if (!oldCookie) {
        oldCookie = {};
      }

      let newExIn = oldCookie.exercises;
      if (!newExIn) {
        newExIn = [];
      }

      newExIn.push(newExercises);

      const newCookieData = JSON.stringify({
        username: oldCookie.username,
        exercises: newExIn,
      });

      window.localStorage.setItem("exercises", newCookieData);
      this.stored = {
        username: window.localStorage.getItem("access"),
        exercises: JSON.parse(window.localStorage.getItem("exercises")),
      };
      this.$modal.hide("inputModal");
      //location.reload();
    },
  },
  data() {
    return {
      stored: null,
      exerciseName: null,
      exerciseType: null,
      exerciseValue: null,
      currentPage: 1,
      totalPages: 0,
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
      }
    }
  },
};
</script>

<style scoped>
#search-type,
.modalInput {
  text-align: center;
}

.form-control {
  margin-left: 4em;
  width: 28em;
}
</style>
