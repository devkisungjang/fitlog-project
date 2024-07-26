<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#0099F7" slider-color="#ffff" show-arrows>
      <v-tab
        v-for="(exercises, group) in exerciseGroups"
        :key="group"
        :value="group"
        class="tab"
        >{{ group }}</v-tab
      >
    </v-tabs>
    <v-card-text class="v-card-text">
      <v-tabs-items v-model="tab">
        <v-tab-item :value="tab">
          <div
            v-for="exercise in exerciseGroups[tab]"
            :key="exercise.id"
            class="exercise-item"
          >
            <v-list-item-avatar v-if="exercise.image">
              <v-img :src="exercise.image" class="exercise-image" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="exercise-title">{{
                exercise.name
              }}</v-list-item-title>
            </v-list-item-content>
            <v-checkbox class="checkbox"></v-checkbox>
          </div>
        </v-tab-item>
      </v-tabs-items>
      <router-link to="/record">
        <v-btn rounded="lg" size="x-large" class="recordBtn"
          >운동 시작!</v-btn
        ></router-link
      >
    </v-card-text>
  </v-card>
</template>

<script>
import exerciseGroups from "@/exercise_groups.json";

export default {
  data: () => ({
    tab: Object.keys(exerciseGroups)[0], // 첫 번째 그룹을 초기 탭으로 설정
    exerciseGroups: exerciseGroups,
  }),
};
</script>

<style scoped>
.exercise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
  padding: 0px 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.exercise-image {
  height: 120px;
  width: 120px;
  object-fit: cover;
  margin-right: 10px;
}
.v-card-text {
  padding: 10px 10px;
  background-color: #f3f4f6;
}
.exercise-title {
  font-size: 20px;
  font-weight: 700;
}
.recordBtn {
  width: 100%;
  background: #0099f7;
  color: white;
  font-weight: 700;
}
.tab {
  font-size: 16px;
}
.checkbox {
  padding-top: 20px;
}
</style>
