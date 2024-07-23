<template>
  <header>
    <div class="inner">
      <div class="logo"><router-link to="/">FITLOG</router-link></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
/* router-link 태그를 사용했을때 생기는 밑줄 없애기.
router-link와 h2태그에 text-decoration: none;을 적용시키게 되면 적용 x */
a {
  text-decoration: none;
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
.logo a {
  color: #0099f7;
}
</style>
