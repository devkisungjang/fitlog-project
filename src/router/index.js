import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/home.vue";
import Map from "@/pages/map.vue";
import Record from "@/pages/record.vue";
import ExerciseSelection from "@/pages/exercise_selection.vue";
import Complete from "@/pages/complete.vue";
import Login from "@/pages/login.vue"; // login.vue 추가

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/map", component: Map },
    { path: "/record", component: Record },
    { path: "/exercise_selection", component: ExerciseSelection },
    { path: "/complete", component: Complete },
    { path: "/login", component: Login }, // login 경로 추가
  ],
});

export default router;
