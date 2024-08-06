<template>
  <Header />
  <div class="container">
    <Stopwatch ref="stopwatch" />
    <div v-for="(exercise, exerciseIndex) in exercises" :key="exerciseIndex">
      <v-expansion-panels v-model="exercise.expanded" multiple>
        <v-expansion-panel class="content">
          <v-expansion-panel-title class="title">
            {{ exercise.name }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <span class="total-volume"
              >총 볼륨수 : {{ calculateTotalVolume(exerciseIndex) }} kg</span
            >
            <div
              v-for="(set, setIndex) in exercise.sets"
              :key="setIndex"
              class="set-group"
            >
              <div class="set">
                <h3>세트</h3>
                <h3 class="set-count-num">{{ setIndex + 1 }}</h3>
              </div>
              <div class="kg">
                <h3>kg</h3>
                <input
                  type="number"
                  v-model.number="set.kg"
                  @input="updateTotalVolume"
                  class="kg-input"
                  step="2.5"
                />
              </div>
              <div class="count">
                <h3>회</h3>
                <input
                  type="number"
                  v-model.number="set.count"
                  @input="updateTotalVolume"
                  class="count-input"
                  step="5"
                />
              </div>
              <div class="complete-check">
                <h3>완료</h3>
                <label for="checkbox" class="custom-checkbox"></label>
                <input
                  type="checkbox"
                  v-model="set.completed"
                  @change="updateTotalVolume"
                  class="checkbox"
                />
              </div>
            </div>
            <div class="btn-group">
              <v-btn class="delete-btn" @click="removeSet(exerciseIndex)"
                >- 세트삭제</v-btn
              >
              <v-btn class="add-btn" @click="addSet(exerciseIndex)"
                >+ 세트추가</v-btn
              >
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="diary-container">
      <h2>오늘의 운동 일지</h2>
      <v-textarea
        placeholder="예시) 대흉근이 웅장해지는 하루였다."
        clear-icon="mdi-close-circle"
        clearable
        row-height="25"
        rows="3"
        variant="outlined"
        auto-grow
        shaped
      ></v-textarea>
    </div>
    <div class="weight-container">
      <h2>몸무게(kg)</h2>
      <v-number-input
        v-model="weight"
        :reverse="false"
        controlVariant="split"
        label=""
        :hideInput="false"
        inset
        :step="10"
        variant="solo"
        class="weight-input"
      ></v-number-input>
    </div>
    <div class="photo-container">
      <h2>운동 사진</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        @change="onFileChange"
        id="photo-upload"
        class="photo-upload-input"
      />
      <label for="photo-upload" class="photo-upload-label">
        <v-icon>mdi-camera</v-icon> 사진을 추가해주세요
      </label>
      <div class="photo-preview">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-preview"
        >
          <img :src="image.url" alt="Uploaded Photo" />
          <v-icon class="remove-icon" @click="removeImage(index)"
            >mdi-close-circle</v-icon
          >
        </div>
      </div>
    </div>
    <router-link to="/complete">
      <v-btn
        rounded="lg"
        size="x-large"
        class="recordBtn"
        @click="completeWorkout"
        >운동 완료!</v-btn
      >
    </router-link>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Stopwatch from "@/components/stopwatch.vue";
import { useFitlogStore } from "@/store/fitlog.js";

export default {
  components: {
    Header,
    Stopwatch,
  },
  data: () => ({
    exercises: [],
    totalVolume: 0,
    weight: 0,
    images: [], // 여러 이미지를 저장할 배열
    diaryEntry: "",
  }),
  computed: {
    selectedExercises() {
      const fitlogStore = useFitlogStore();
      return fitlogStore.selectedExercises;
    },
  },
  watch: {
    selectedExercises: {
      handler(newExercises) {
        this.exercises = newExercises.map((exercise) => ({
          name: exercise,
          sets: [{ kg: 0, count: 0, completed: false }],
          expanded: [0],
        }));
      },
      immediate: true,
    },
  },
  methods: {
    addSet(exerciseIndex) {
      const lastSet =
        this.exercises[exerciseIndex].sets[
          this.exercises[exerciseIndex].sets.length - 1
        ];
      this.exercises[exerciseIndex].sets.push({
        kg: lastSet.kg,
        count: lastSet.count,
        completed: false,
      });
      this.updateTotalVolume();
    },
    removeSet(exerciseIndex) {
      if (this.exercises[exerciseIndex].sets.length > 1) {
        this.exercises[exerciseIndex].sets.pop();
        this.updateTotalVolume();
      }
    },
    updateTotalVolume() {
      this.totalVolume = this.exercises.reduce((total, exercise) => {
        return (
          total +
          exercise.sets.reduce((exerciseTotal, set) => {
            return set.completed
              ? exerciseTotal + set.kg * set.count
              : exerciseTotal;
          }, 0)
        );
      }, 0);
    },
    calculateTotalVolume(exerciseIndex) {
      return this.exercises[exerciseIndex].sets.reduce((total, set) => {
        return set.completed ? total + set.kg * set.count : total;
      }, 0);
    },
    onFileChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({ file, url: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    completeWorkout() {
      this.$refs.stopwatch.stop();
      const fitlogStore = useFitlogStore();
      fitlogStore.setTotalVolume(this.totalVolume);
      fitlogStore.setWeight(this.weight);
    },
  },
};
</script>

<style scoped>
/* 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 10px;
  max-width: 1199px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 헤더 */
h2 {
  color: #333;
  margin-bottom: 10px;
}

/* 확장 패널 */
.content {
  border-radius: 10px;
  overflow: hidden;
}

.title {
  font-size: 20px;
  color: #333;
  font-weight: 700;
}

.set-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.set,
.kg,
.count,
.complete-check {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 65px;
}

.kg-input,
.count-input {
  width: 80px;
  height: 35px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  outline: none;
  margin-top: 5px;
  transition: border-color 0.3s;
}

.kg-input:focus,
.count-input:focus {
  border-color: #0099f7;
}
.complete-check {
  display: flex;
}

.complete-check label {
  font-size: 16px;
  /* color: #333; */
}

.checkbox {
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #0099f7;
  transition: transform 0.2s;
  margin-top: 9px;
}

.checkbox:checked {
  transform: scale(1.1);
}

/* 버튼 그룹 */
.btn-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.btn-group .delete-btn,
.btn-group .add-btn {
  background: #0099f7;
  color: white;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 700;
}

/* 총 볼륨 */
.total-volume {
  font-size: 18px;
  font-weight: 700;
  color: #0099f7;
}

/* 다이어리 컨테이너 */
.diary-container {
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 몸무게 입력 */
.weight-container {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.weight-input {
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
}

/* 사진 업로드 */
.photo-container {
  width: 100%;
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.photo-container h2 {
  padding-bottom: 10px;
}

.photo-upload-input {
  display: none;
}

.photo-upload-label {
  max-width: 300px;
  padding: 15px 30px;
  border: 2px solid #0099f7;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  background-color: #0099f7;
  font-weight: bold;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.photo-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.image-preview {
  position: relative;
  width: 150px;
  height: 150px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-preview:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.remove-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 20px;
  color: red;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  padding: 2px;
}

/* 운동 완료 버튼 */
.recordBtn {
  width: 100%;
  background: #0099f7;
  color: white;
  font-weight: 700;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s;
}

.recordBtn:hover {
  background-color: #007acc;
}
</style>
