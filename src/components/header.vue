<template>
  <header>
    <div class="inner">
      <div class="logo">
        <router-link to="/">FITLOG</router-link>
      </div>
      <!-- 기존 스타일을 유지하면서 로그인 버튼을 오른쪽에 배치 -->
      <div class="auth-buttons">
        <button @click="goToLogin">로그인</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goToLogin() {
      this.$router.push("/login"); // login 페이지로 이동
    },
  },
};
</script>

<style scoped>
.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100px;
}

.logo {
  font-size: 36px;
  color: #0099f7;
  font-weight: 700;
}

.logo a {
  color: #0099f7;
  text-decoration: none;
}

.auth-buttons {
  margin-left: auto; /* 로그인 버튼을 오른쪽으로 밀어냄 */
}

button {
  background-color: #0099f7;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #007acc;
}
</style>
