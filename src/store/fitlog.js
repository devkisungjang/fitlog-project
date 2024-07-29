import { defineStore } from "pinia";

export const useFitlogStore = defineStore("fitlog", {
  state: () => ({
    data: null,
  }),
  actions: {
    setData(newData) {
      this.data = newData;
    },
    clearData() {
      this.data = null;
    },
  },
});
