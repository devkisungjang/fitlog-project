import { defineStore } from "pinia";

export const useFitlogStore = defineStore("fitlog", {
  state: () => ({
    selectedDate: null,
    selectedExercises: [],
    totalVolume: 0,
    weight: 0,
    totalWorkoutTime: "00:00:00", // 추가
  }),
  actions: {
    setSelectedDate(date) {
      this.selectedDate = date;
    },
    setSelectedExercises(exercises) {
      this.selectedExercises = exercises;
    },
    setTotalVolume(volume) {
      this.totalVolume = volume;
    },
    setWeight(weight) {
      this.weight = weight;
    },
    setTotalWorkoutTime(time) {
      // 추가
      this.totalWorkoutTime = time;
    },
  },
});
