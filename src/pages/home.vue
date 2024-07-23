<template>
  <div class="container">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-responsive>
            <v-date-picker
              color="#0099F7"
              :style="{ width: '100%' }"
            ></v-date-picker>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
    <router-link to="/exercise_selection">
      <v-btn rounded="lg" size="x-large" class="recordBtn"
        >운동 기록하기!</v-btn
      ></router-link
    >
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
}
.recordBtn {
  width: 100%;
  background: #0099f7;
  color: white;
  font-weight: 700;
}
router-link {
  text-decoration: none; /* router-link 기본 스타일 제거 */
}
</style>
