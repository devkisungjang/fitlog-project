import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VNumberInput } from "vuetify/labs/VNumberInput";
import { ko } from "vuetify/locale";

export default createVuetify({
  theme: {
    defaultTheme: "light",
  },
  components: {
    VNumberInput,
  },
  locale: {
    locale: "ko",
    fallback: "ko",
    messages: { ko },
  },
});
