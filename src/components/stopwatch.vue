<template>
  <div id="clock">
    <span class="time">{{ time }}</span>
    <div class="btn-container">
      <button class="start" @click="start">운동 시작</button>
      <button class="stop" @click="stop">일시정지</button>
      <button class="reset" @click="reset">초기화</button>
    </div>
  </div>
</template>

<script>
import { useFitlogStore } from "@/store/fitlog.js";

export default {
  name: "Stopwatch",
  data() {
    return {
      time: "00:00:00",
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
    };
  },
  methods: {
    start() {
      if (this.running) return;

      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration +=
          new Date().getTime() - this.timeStopped.getTime();
      }

      this.started = setInterval(() => {
        this.clockRunning();
        this.saveTime(); // 실시간으로 시간 업데이트
      }, 1000);
      this.running = true;
    },
    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
      this.saveTime(); // 시간 저장
    },
    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00:00";
      this.saveTime(); // 시간 초기화 시 저장
    },
    clockRunning() {
      let currentTime = new Date();
      let timeElapsed = new Date(
        currentTime.getTime() - this.timeBegan.getTime() - this.stoppedDuration
      );
      let hour = timeElapsed.getUTCHours();
      let min = timeElapsed.getUTCMinutes();
      let sec = timeElapsed.getUTCSeconds();

      this.time =
        this.zeroPrefix(hour, 2) +
        ":" +
        this.zeroPrefix(min, 2) +
        ":" +
        this.zeroPrefix(sec, 2);
    },
    zeroPrefix(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    saveTime() {
      const fitlogStore = useFitlogStore();
      fitlogStore.setTotalWorkoutTime(this.time);
    },
  },
  expose: ["stop"], // stop 메서드를 외부에서 호출할 수 있도록 설정
};
</script>

<style scoped>
#clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #0099f7;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
}

.time {
  font-size: 48px; /* 더 큰 글꼴 크기로 시간 강조 */
  font-weight: bold;
  margin-bottom: 20px;
}

.text {
  margin-top: 30px;
  font-size: 1em;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* 버튼 사이 간격 축소 */
  margin-top: 15px;
  width: 100%;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #0099f7;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #007acc;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

.start {
  background-color: #28a745; /* 시작 버튼은 녹색 */
}

.start:hover {
  background-color: #218838;
}

.stop {
  background-color: #dc3545; /* 일시정지 버튼은 빨간색 */
}

.stop:hover {
  background-color: #c82333;
}

.reset {
  background-color: #ffc107; /* 초기화 버튼은 노란색 */
}

.reset:hover {
  background-color: #e0a800;
}
</style>
