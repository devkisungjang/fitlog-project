<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>운동 기록</v-toolbar-title>
          </v-toolbar>
        </v-col>
      </v-row>

      <v-row v-for="exercise in selectedExercises" :key="exercise.id">
        <v-col>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <div class="d-flex justify-space-between align-center">
                  {{ exercise.name }}
                  <v-btn icon @click="removeExercise(exercise.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <template v-if="exercise.type === 'cardio'">
                  <v-row v-for="(set, index) in exercise.sets" :key="index">
                    <v-col>
                      <v-text-field
                        label="세트"
                        v-model="set.setNumber"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="시간 (분)"
                        v-model="set.time"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-checkbox v-model="set.completed"></v-checkbox>
                    </v-col>
                  </v-row>
                </template>
                <template v-else>
                  <v-row v-for="(set, index) in exercise.sets" :key="index">
                    <v-col>
                      <v-text-field
                        label="세트"
                        v-model="set.setNumber"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field label="kg" v-model="set.kg"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="횟수"
                        v-model="set.reps"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-checkbox v-model="set.completed"></v-checkbox>
                    </v-col>
                  </v-row>
                </template>
                <v-row>
                  <v-col>
                    <v-btn @click="removeSet(exercise.id, index)"
                      >- 세트삭제</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn @click="addSet(exercise.id)">+ 세트추가</v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>

      <div class="d-flex">
        <v-checkbox v-model="disabled" label="잠금"></v-checkbox>
      </div>
      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel>
          <v-expansion-panel-title>운동 일지</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-textarea
              bg-color="light-blue"
              clearable
              variant="solo-filled"
            ></v-textarea>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>몸무게</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="8">
                <v-text-field model-value="28.00" suffix="kg"></v-text-field>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="file"
                  label="Choose an image"
                  accept="image/*"
                  @change="onFileSelected"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-img
                  v-if="imageUrl"
                  :src="imageUrl"
                  max-width="500"
                  class="my-5"
                ></v-img>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row class="text-center">
        <v-col>
          <v-btn color="primary" @click="completeWorkout">작성 완료하기</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Record",
  data() {
    return {
      file: null,
      imageUrl: null,
      panel: [0, 1],
      disabled: false,
    };
  },
  computed: {
    ...mapGetters(["getSelectedExercises"]),
    selectedExercises() {
      return this.getSelectedExercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets || [
          exercise.type === "cardio"
            ? { setNumber: 1, time: 30, completed: false }
            : { setNumber: 1, kg: 10, reps: 10, completed: false },
        ],
      }));
    },
  },
  methods: {
    ...mapActions(["updateSelectedExercises"]),
    onFileSelected() {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };

      if (this.file) {
        reader.readAsDataURL(this.file);
      }
    },
    addSet(exerciseId) {
      const exercise = this.selectedExercises.find((e) => e.id === exerciseId);
      const newSet =
        exercise.type === "cardio"
          ? { setNumber: exercise.sets.length + 1, time: 30, completed: false }
          : {
              setNumber: exercise.sets.length + 1,
              kg: 10,
              reps: 10,
              completed: false,
            };
      exercise.sets.push(newSet);
      this.updateSelectedExercises([...this.selectedExercises]);
    },
    removeSet(exerciseId, setIndex) {
      const exercise = this.selectedExercises.find((e) => e.id === exerciseId);
      if (exercise.sets.length > 1) {
        exercise.sets.splice(setIndex, 1);
        exercise.sets.forEach((set, index) => {
          set.setNumber = index + 1;
        });
        this.updateSelectedExercises([...this.selectedExercises]);
      }
    },
    removeExercise(exerciseId) {
      const index = this.selectedExercises.findIndex(
        (e) => e.id === exerciseId
      );
      if (index !== -1) {
        this.selectedExercises.splice(index, 1);
        this.updateSelectedExercises([...this.selectedExercises]);
      }
    },
    completeWorkout() {
      alert("운동 기록이 완료되었습니다.");
      // 작성 완료 로직을 여기에 추가하세요
    },
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
.v-expansion-panel-header {
  background-color: #90caf9;
}
</style>
