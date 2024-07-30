// src/store/fitlog.js
import { defineStore } from "pinia";

export const useFitlogStore = defineStore("fitlog", {
  state: () => ({
    selectedDate: null,
    checkedExercises: {},
    totalVolume: 0,
    weight: 0,
  }),
  actions: {
    setSelectedDate(date) {
      this.selectedDate = date;
    },
    setCheckedExercises(group, checkedItems) {
      this.checkedExercises[group] = checkedItems;
    },
    setTotalVolume(volume) {
      this.totalVolume = volume;
    },
    setWeight(weight) {
      this.weight = weight;
    },
  },
});
