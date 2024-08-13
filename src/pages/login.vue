<template>
  <div class="login-container">
    <h1>로그인</h1>
    <p>구글 계정으로 간편하게 로그인하세요</p>
    <button @click="signInWithGoogle" class="google-login-btn">
      구글로 로그인
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    signInWithGoogle() {
      // 이 부분은 나중에 Supabase를 사용해 실제로 로그인 기능을 구현할 때 채워질 예정입니다.
      console.log("Google 소셜 로그인 시도");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
}

p {
  margin-bottom: 30px;
  color: #666;
}

.google-login-btn {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.google-login-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
