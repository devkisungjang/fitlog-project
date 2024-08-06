<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation v-model="value" color="#0099f7" grow>
      <v-btn>
        <router-link to="/">
          <v-icon>mdi-history</v-icon>
          <span>운동 기록</span></router-link
        >
      </v-btn>
      <v-btn>
        <router-link to="/map">
          <v-icon>mdi-map-marker</v-icon>
          <span>주변 헬스장</span></router-link
        >
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script>
export default {
  data: () => ({ value: 0 }),
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>

<style scoped>
a {
  font-size: larger;
  color: #0099f7;
}
span {
  color: black;
  padding-left: 10px;
}
</style>
