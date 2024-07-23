import { createStore } from "vuex";

export default createStore({
  state: {
    selectedExercises: [],
  },
  mutations: {
    setSelectedExercises(state, exercises) {
      state.selectedExercises = exercises;
    },
  },
  actions: {
    updateSelectedExercises({ commit }, exercises) {
      commit("setSelectedExercises", exercises);
    },
  },
  getters: {
    getSelectedExercises: (state) => state.selectedExercises,
  },
});
