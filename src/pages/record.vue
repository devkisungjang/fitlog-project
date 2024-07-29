<template>
  <Header />
  <div class="container">
    <Stopwatch />
    <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
      <v-expansion-panel class="content">
        <v-expansion-panel-title class="title">
          벤치프레스
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <span class="total-volume">총 볼륨 수 : {{ totalVolume }} kg</span>
          <div v-for="(set, index) in sets" :key="index" class="set-group">
            <div class="set">
              <h3>세트</h3>
              <h3 class="set-count-num">{{ index + 1 }}</h3>
            </div>
            <div class="kg">
              <h3>kg</h3>
              <input
                type="number"
                class="kg-input"
                variant="outlined"
                hide-details
                hide-input
                v-model.number="set.kg"
                @input="updateTotalVolume"
                @keydown.up.prevent="increaseValue(index)"
                @keydown.down.prevent="decreaseValue(index)"
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
      <!-- ------------------------------------------------- -->
      <div class="diary-container">
        <h2>오늘의 운동 일지</h2>
        <v-textarea
          bg-color="#0099f7"
          color="white"
          label="예시) 대흉근이 웅장해지는 하루였다."
          variant="solo-filled"
          class="textarea"
        ></v-textarea>
      </div>
      <div class="weight-container">
        <h2>몸무게(kg)</h2>
        <v-number-input
          control-variant="split"
          :max="500"
          :step="5"
          :model-value="0"
          variant="outlined"
          bg-color="#0099f7"
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
    </v-expansion-panels>
    <router-link to="/complete">
      <v-btn rounded="lg" size="x-large" class="recordBtn">운동 완료!</v-btn>
    </router-link>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Stopwatch from "@/components/stopwatch.vue";

export default {
  data: () => ({
    panel: [0, 1],
    disabled: false,
    sets: [{ kg: 0, count: 0, completed: false }],
    totalVolume: 0,
    imageUrl: null, // 이미지 URL 저장을 위한 변수
  }),
  methods: {
    addSet() {
      const lastSet = this.sets[this.sets.length - 1];
      this.sets.push({
        kg: lastSet.kg || 0,
        count: lastSet.count || 0,
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
    increaseValue(index) {
      this.sets[index].kg += 2.5;
      this.updateTotalVolume();
    },
    decreaseValue(index) {
      if (this.sets[index].kg >= 2.5) {
        this.sets[index].kg -= 2.5;
        this.updateTotalVolume();
      }
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
  padding: 10px 0;
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
  width: 100%;
}
.complete-check {
  display: flex;
  gap: 5px;
}
.kg-input,
.count-input {
  width: 70px;
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
  height: 45px;
  border-radius: 20px;
  background: #59b8f9;
  color: white;
  font-size: 16px;
}
.total-volume {
  color: #ffff;
  font-size: 18px;
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
a {
  text-decoration: none;
}
/* 쳌박 커스텀 */
.checkbox {
  width: 30px;
  height: 30px;
  cursor: pointer;
  padding-bottom: 10px;
}
</style>
