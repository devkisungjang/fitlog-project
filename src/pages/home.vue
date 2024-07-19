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
    <v-btn rounded="lg" size="x-large" class="recordBtn">운동 기록하기!</v-btn>
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
  background-color: F3F4F6;
}
.recordBtn {
  width: 100%;
  background: #0099f7;
  color: white;
  font-weight: 700;
}
</style>
