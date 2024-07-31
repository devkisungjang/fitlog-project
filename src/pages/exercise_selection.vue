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
.exercise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
  padding: 0px 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.exercise-item.selected {
  background-color: #cceeff; /* 청록색 계열의 밝은 색상 */
  transform: scale(1.02);
}

.exercise-image {
  height: 120px;
  width: 120px;
  object-fit: cover;
  margin-right: 10px;
}

.exercise-title {
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.check-icon {
  font-size: 36px;
  margin-left: 20px;
  margin-right: 20px;
  width: 36px;
  height: 36px;
}

.v-card-text {
  padding: 10px 10px;
  background-color: #f3f4f6;
}

.recordBtn {
  width: 100%;
  background: #0099f7;
  color: white;
  font-weight: 700;
}

.tab {
  font-size: 16px;
}
</style>
