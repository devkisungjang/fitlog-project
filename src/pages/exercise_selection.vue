<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Fitlog</v-toolbar-title>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs v-model="activeTab" background-color="grey lighten-3">
            <v-tab
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectTab(tab)"
            >
              {{ tab }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-list>
            <v-list-item v-for="exercise in exercises" :key="exercise.id">
              <v-list-item-avatar>
                <img :src="exercise.image" alt="사진" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ exercise.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="exercise.checked"></v-checkbox>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn color="primary" @click="startWorkout">운동 시작하기!</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import exerciseGroups from "../exercise_groups.json";

export default {
  name: "ExerciseSelection",
  data() {
    return {
      tabs: ["가슴", "어깨", "등", "하체", "복근", "유산소"],
      activeTab: "가슴",
      allExercises: this.initializeExercises(),
      exercises: [],
    };
  },
  methods: {
    ...mapActions(["updateSelectedExercises"]),
    initializeExercises() {
      const allExercises = {};
      Object.keys(exerciseGroups).forEach((group) => {
        allExercises[group] = exerciseGroups[group].map((exercise) => ({
          ...exercise,
          checked: false,
        }));
      });
      return allExercises;
    },
    selectTab(tab) {
      this.activeTab = tab;
      this.exercises = this.allExercises[tab];
    },
    startWorkout() {
      const selectedExercises = Object.values(this.allExercises)
        .flat()
        .filter((exercise) => exercise.checked);
      this.updateSelectedExercises(selectedExercises);
      this.$router.push("/record");
    },
  },
  created() {
    this.exercises = this.allExercises[this.activeTab];
  },
};
</script>

<style scoped>
.v-list-item {
  border: 1px solid #ddd;
  margin-bottom: 8px;
}
.v-list-item-avatar img {
  width: 50px;
  height: 50px;
}
</style>
