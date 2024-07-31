<template>
  <Header />
  <div class="container">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-responsive>
            <v-date-picker
              color="#0099f7"
              :style="{ width: '100%' }"
              v-model="selectedDate"
              @input="onDateSelected"
              :locale="locale"
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
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  setup() {
    const selectedDate = ref(null);
    const fitlogStore = useFitlogStore();

    const onDateSelected = (date) => {
      selectedDate.value = date;
    };

    const recordExercise = () => {
      fitlogStore.setSelectedDate(selectedDate.value);
    };

    return {
      selectedDate,
      onDateSelected,
      recordExercise,
    };
  },
};
</script>

<style scoped>
/* Reset and base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

body {
  background-color: #f0f4f8;
  color: #333;
}

/* Container styling */
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Date Picker styling */
.v-date-picker {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Button styling */
.recordBtn {
  width: 100%;
  background-color: #0099f7;
  color: white;
  font-weight: 700;
  padding: 15px 0;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}
header {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #0099f7;
}

a {
  text-decoration: none;
}
</style>
