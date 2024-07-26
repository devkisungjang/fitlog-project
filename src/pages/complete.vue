<template>
  <main>
    <div class="inner">
      <h1>Good Job~!</h1>
      <div class="exercise-data">
        <h2>총 운동 시간 :</h2>
        <h2>총 볼륨 수 :</h2>
        <h2>몸무게 :</h2>
      </div>
    </div>
    <router-link to="/">
      <v-btn rounded="lg" size="x-large" class="recordBtn"
        >홈으로 돌아가기</v-btn
      >
    </router-link>
  </main>
</template>

<script></script>

<style scoped>
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
</style>
