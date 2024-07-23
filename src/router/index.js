import { createRouter, createWebHistory } from "vue-router";
// 1.라우터에서 쓸 기능을 불러온다
import Home from "@/pages/home.vue";
import Map from "@/pages/map.vue";
import Record from "@/pages/record.vue";
import ExerciseSelection from "@/pages/exercise_selection.vue";
// 2.페이지구성(하위)할 컴포넌트들을 불러온다. 여기서 사용되는 변수명은 각 .vue에서 export default로 내보내고있는 이름들이다.
// 3. createRouter(옵션객체)로 인스턴스 생성, 옵션객체는 외부에서 작성하고 변수로 넣어도 되고, 인자로 직접넣어도 된다. 옵션객체의 기본 구조로는 history, routes로 되어있다.
const router = createRouter({
  history: createWebHistory(), // 앞으로, 뒤로 페이지 이동하는 기록을 관리함
  routes: [
    { path: "/", component: Home },
    { path: "/map", component: Map },
    { path: "/record", component: Record },
    { path: "/exercise_selection", component: ExerciseSelection },
  ], // 배열안에 세부페이지 정보를 객체로 구성한다. path와 component를 최소값으로 구성한다.
});

// 4. 인스턴스를 변수에 할당하여 내보낸다.

export default router;
