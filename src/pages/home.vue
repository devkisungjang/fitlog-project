<template>
  <Header />
  <div class="container">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-responsive>
            <v-date-picker
              color="#0099f7"
              :style="{ width: '100%' }"
              v-model="selectedDate"
              @input="onDateSelected"
            >
              <!-- 타이틀 커스터마이징을 위한 슬롯 사용 -->
              <template v-slot:title>
                <span>날짜를 선택해주세요!</span>
                <!-- "Select date"를 "날짜 선택"으로 변경 -->
              </template>
            </v-date-picker>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
    <router-link to="/exercise_selection">
      <v-btn
        rounded="lg"
        size="x-large"
        class="recordBtn"
        @click="recordExercise"
        >운동 기록하기!</v-btn
      >
    </router-link>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import { useFitlogStore } from "@/store/fitlog.js";
import { ref } from "vue";
import { ko } from "vuetify/locale"; // 한국어 로케일 가져오기

export default {
  name: "Home",
  components: {
    Header,
  },
  setup() {
    // 오늘 날짜를 기본값으로 설정
    const today = new Date();
    const selectedDate = ref(today);
    const fitlogStore = useFitlogStore();

    const onDateSelected = (date) => {
      selectedDate.value = date;
    };

    const recordExercise = () => {
      fitlogStore.setSelectedDate(selectedDate.value);
    };

    return {
      selectedDate,
      onDateSelected,
      recordExercise,
      ko, // 한국어 로케일
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1199px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.recordBtn {
  width: 100%;
  background-color: #0099f7;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

a {
  text-decoration: none;
}
</style>
