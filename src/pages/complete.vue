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
      const selectedDate = fitlogStore.selectedDate || new Date();
      return new Date(selectedDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
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
/* 기본 설정 */
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0099f7;
  padding: 20px;
  text-align: center;
  color: #ffffff;
}

.inner {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
  color: #fff;
}

.data-group {
  width: 100%;
}

.date {
  font-size: 24px;
  margin-bottom: 10px;
  color: #fff;
}

.exercise-data {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
}

.recordBtn {
  width: 100%; /* 가로값이 꽉 차도록 설정 */
  background: #59b8f9;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
a {
  text-decoration: none;
}
</style>
