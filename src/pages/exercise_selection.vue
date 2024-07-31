<template>
  <Header />
  <v-card>
    <v-tabs v-model="tab" bg-color="#0099F7" slider-color="#ffff" show-arrows>
      <v-tab
        v-for="(exercise, group) in exerciseGroups"
        :key="group"
        :value="group"
        class="tab"
        >{{ group }}</v-tab
      >
    </v-tabs>
    <v-card-text class="v-card-text">
      <v-tabs-items v-model="tab">
        <v-tab-item :value="tab">
          <div
            v-for="(exercise, index) in exerciseGroups[tab]"
            :key="exercise.id"
            :class="['exercise-item', { selected: checkedItems[tab][index] }]"
            @click="toggleSelect(tab, index)"
          >
            <v-list-item-avatar v-if="exercise.image">
              <v-img :src="exercise.image" class="exercise-image" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="exercise-title">{{
                exercise.name
              }}</v-list-item-title>
            </v-list-item-content>
            <v-icon
              :color="checkedItems[tab][index] ? 'green' : 'grey'"
              class="check-icon"
            >
              mdi-check-circle
            </v-icon>
          </div>
        </v-tab-item>
      </v-tabs-items>
      <router-link to="/record">
        <v-btn
          rounded="lg"
          size="x-large"
          class="recordBtn"
          @click="startExercise"
          >운동 시작!</v-btn
        ></router-link
      >
    </v-card-text>
  </v-card>
</template>

<script>
import Header from "@/components/header.vue";
import exerciseGroups from "@/exercise_groups.json";
import { useFitlogStore } from "@/store/fitlog.js";

export default {
  data: () => ({
    tab: Object.keys(exerciseGroups)[0],
    exerciseGroups: exerciseGroups,
    checkedItems: Object.keys(exerciseGroups).reduce((acc, group) => {
      acc[group] = exerciseGroups[group].map(() => false);
      return acc;
    }, {}),
  }),
  methods: {
    toggleSelect(group, index) {
      this.checkedItems[group].splice(
        index,
        1,
        !this.checkedItems[group][index]
      );
    },
    startExercise() {
      const fitlogStore = useFitlogStore();
      const selectedExercises = [];

      Object.keys(this.checkedItems).forEach((group) => {
        this.checkedItems[group].forEach((isChecked, index) => {
          if (isChecked) {
            selectedExercises.push(this.exerciseGroups[group][index].name);
          }
        });
      });
      fitlogStore.setSelectedExercises(selectedExercises);
    },
  },
};
</script>

<style scoped>
.v-card {
  max-width: 1199px;
  margin: auto;
  border-radius: 10px;
}

.v-card-text {
  padding: 20px;
  background-color: #f9f9f9;
}

.exercise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.exercise-item.selected {
  background-color: #e6f7ff; /* 선택된 항목의 배경색 */
  transform: scale(1.03);
}

.exercise-image {
  height: 80px;
  width: 80px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 8px;
}

.exercise-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.check-icon {
  font-size: 28px;
}

/* 운동 시작 버튼 스타일 */
.recordBtn {
  width: 100%;
  background-color: #0099f7;
  color: white;
  font-weight: 700;
  padding: 15px 0;
  border-radius: 10px;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
