<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation v-model="value" color="#0099f7" grow>
      <v-btn>
        <router-link to="/">
          <v-icon>mdi-history</v-icon>
          운동 기록 보기</router-link
        >
      </v-btn>
      <v-btn>
        <router-link to="/map">
          <v-icon>mdi-map-marker</v-icon>
          주변 헬스장</router-link
        >
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script>
export default {
  data: () => ({ value: 1 }),
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>

<style scoped>
a {
  color: #0099f7;
}
</style>
