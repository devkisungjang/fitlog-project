<template>
  <Header />
  <div class="container">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-responsive>
            <v-date-picker
              color="#0099F7"
              :style="{ width: '100%' }"
              v-model="selectedDate"
              @input="onDateSelected"
            ></v-date-picker>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
    <router-link to="/exercise_selection">
      <v-btn
        rounded="lg"
        size="x-large"
        class="recordBtn"
        @click="recordExercise"
        >운동 기록하기!</v-btn
      ></router-link
    >
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import { useFitlogStore } from "@/store/fitlog.js";

export default {
  name: "Home",
  data() {
    return {
      selectedDate: null,
    };
  },
  methods: {
    onDateSelected(date) {
      this.selectedDate = date;
    },
    recordExercise() {
      const fitlogStore = useFitlogStore();
      fitlogStore.setSelectedDate(this.selectedDate);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0 10px;
}
.recordBtn {
  width: 100%;
  background: #0099f7;
  color: white;
  font-weight: 700;
}
</style>
