<template>
  <main>
    <div class="inner">
      <h1>Good Job~!</h1>
      <div class="data-group">
        <h3 class="date">{{ formattedDate }}</h3>
        <div class="exercise-data">
          <h2>총 운동 시간 : {{ totalWorkoutTime }}</h2>
          <h2>총 볼륨 수 : {{ totalVolume }} kg</h2>
          <h2>몸무게 : {{ weight }} kg</h2>
        </div>
      </div>
    </div>
    <router-link to="/">
      <v-btn rounded="lg" size="x-large" class="recordBtn"
        >홈으로 돌아가기</v-btn
      >
    </router-link>
  </main>
</template>

<script>
import confetti from "canvas-confetti";
import { useFitlogStore } from "@/store/fitlog.js";

export default {
  name: "Complete",
  computed: {
    formattedDate() {
      const fitlogStore = useFitlogStore();
      const selectedDate = fitlogStore.selectedDate;
      return selectedDate
        ? new Date(selectedDate).toDateString()
        : "날짜 선택 안됨";
    },
    totalVolume() {
      const fitlogStore = useFitlogStore();
      return fitlogStore.totalVolume;
    },
    weight() {
      const fitlogStore = useFitlogStore();
      return fitlogStore.weight;
    },
    totalWorkoutTime() {
      const fitlogStore = useFitlogStore();
      return fitlogStore.totalWorkoutTime;
    },
  },
  mounted() {
    this.startConfetti();
  },
  beforeUnmount() {
    if (this.confettiInterval) {
      clearInterval(this.confettiInterval);
    }
  },
  methods: {
    startConfetti() {
      this.confettiInterval = setInterval(this.launchConfetti, 1000);
    },
    launchConfetti() {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
  },
};
</script>

<style scoped>
/* 스타일 유지 */
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: #0099f7;
  padding: 10px;
}
.inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  padding: 20px;
}
h1 {
  text-align: center;
  font-size: 60px;
  color: #fff;
}
h2 {
  font-size: 30px;
  color: #fff;
}
.recordBtn {
  width: 100%;
  background: #59b8f9;
  color: white;
  font-weight: 700;
}
.date {
  color: #fff;
  padding-bottom: 5px;
}
.exercise-data {
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 10px;
}
</style>
