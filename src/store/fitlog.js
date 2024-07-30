import { defineStore } from "pinia";

export const useFitlogStore = defineStore("fitlog", {
  state: () => ({
    selectedDate: null,
    selectedExercises: [],
    totalVolume: 0,
    weight: 0,
    // diaryEntry: "", // 필요시 활성화
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
    // setDiaryEntry(entry) {
    //   this.diaryEntry = entry;
    // },
  },
});
