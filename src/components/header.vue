<template>
  <header>
    <div class="inner">
      <div class="logo">FITLOG</div>
      <div class="menu">
        <h2 @click="goToHome">운동 계획</h2>
        <h2 @click="goToMap">주변 헬스장</h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    goToMap() {
      this.$router.push("@/pages/map.vue");
    },
  },
};
</script>

<style scoped>
h2 {
  cursor: pointer;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 36px;
  color: #0099f7;
  font-weight: 700;
}
.menu {
  display: flex;
  padding: 0px 20px;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100px;
  border-bottom-color: 1px solid black;
}
</style>
