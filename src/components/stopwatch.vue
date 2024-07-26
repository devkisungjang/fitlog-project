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

      this.started = setInterval(this.clockRunning, 1000);
      this.running = true;
    },
    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
    },
    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00:00";
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
  },
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
  border-radius: 30px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.time {
  font-size: 6cqh;
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
  gap: 30px;
  margin-top: 15px;
  width: 100%;
}
</style>
