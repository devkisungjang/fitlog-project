<template>
  <Header />
  <div class="container">
    <Stopwatch />
    <div v-for="(exercise, index) in selectedExercises" :key="index">
      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel class="content">
          <v-expansion-panel-title class="title">{{
            exercise
          }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <span class="total-volume">총 볼륨수 : {{ totalVolume }} kg</span>
            <div v-for="(set, index) in sets" :key="index" class="set-group">
              <div class="set">
                <h3>세트</h3>
                <h3 class="set-count-num">{{ index + 1 }}</h3>
              </div>
              <div class="kg">
                <h3>kg</h3>
                <input
                  type="number"
                  v-model.number="set.kg"
                  @input="updateTotalVolume"
                  class="kg-input"
                />
              </div>
              <div class="count">
                <h3>회</h3>
                <input
                  type="number"
                  v-model.number="set.count"
                  @input="updateTotalVolume"
                  class="count-input"
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
              <v-btn class="delete-btn" @click="removeSet">- 세트삭제</v-btn>
              <v-btn class="add-btn" @click="addSet">+ 세트추가</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="diary-container">
      <h2>오늘의 운동 일지</h2>
      <v-textarea
        v-model="diaryEntry"
        bg-color="#0099f7"
        color="white"
        variant="solo-filled"
        class="textarea"
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
        :step="0.1"
        variant="solo"
        bg-color="#0099f7"
        class="weight-input"
      ></v-number-input>
    </div>
    <div class="photo-container">
      <h2>운동 사진</h2>
      <v-file-input
        prepend-icon="mdi-camera"
        variant="solo"
        @change="onFileChange"
      ></v-file-input>
      <div class="photo">
        <span v-if="!imageUrl">사진을 등록해주세요!</span>
        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Photo" />
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
  data: () => ({
    panel: [0, 1],
    disabled: false,
    sets: [{ kg: 0, count: 0, completed: false }],
    totalVolume: 0,
    weight: 0,
    imageUrl: null,
    diaryEntry: "",
  }),
  computed: {
    selectedExercises() {
      const fitlogStore = useFitlogStore();
      return fitlogStore.selectedExercises;
    },
  },
  methods: {
    addSet() {
      const lastSet = this.sets[this.sets.length - 1];
      this.sets.push({
        kg: lastSet.kg,
        count: lastSet.count,
        completed: false,
      });
      this.updateTotalVolume();
    },
    removeSet() {
      if (this.sets.length > 1) {
        this.sets.pop();
        this.updateTotalVolume();
      }
    },
    updateTotalVolume() {
      this.totalVolume = this.sets.reduce((total, set) => {
        return set.completed ? total + set.kg * set.count : total;
      }, 0);
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    completeWorkout() {
      const fitlogStore = useFitlogStore();
      fitlogStore.setTotalVolume(this.totalVolume);
      fitlogStore.setWeight(this.weight);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 10px;
  background-color: #f3f4f6;
}
.content {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 100%;
  background: #0099f7;
}
.title {
  font-size: 20px;
  color: #ffff;
  font-weight: 700;
  border-bottom: 1px solid #ffff;
}
.set-group {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 20px;
  color: #ffff;
}
.set,
.kg,
.count,
.complete-check {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.complete-check {
  display: flex;
  gap: 5px;
}
.kg-input,
.count-input {
  width: 60px;
  height: 30px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
}
.recordBtn {
  width: 100%;
  background: #0099f7;
  color: white;
  font-weight: 700;
}
.btn-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.btn-group .delete-btn,
.btn-group .add-btn {
  width: 125px;
  height: 45px;
  border-radius: 20px;
  background: #59b8f9;
  color: white;
  font-size: 16px;
}
.total-volume {
  font-size: 18px;
  font-weight: 600;
  color: white;
  padding-bottom: 20px;
}
.diary-container,
.photo-container,
.weight-container {
  width: 100%;
  margin-top: 20px;
}
.photo-container .photo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  border: 1px solid black;
  border-radius: 20px;
}
.photo-container .photo img {
  max-width: 100%;
  max-height: 100%;
}
/* 쳌박 커스텀 */
.checkbox {
  width: 30px;
  height: 30px;
  cursor: pointer;
  padding-bottom: 10px;
}
</style>
