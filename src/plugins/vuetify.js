import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VNumberInput } from "vuetify/labs/VNumberInput";

export default createVuetify({
  theme: {
    defaultTheme: "light",
  },
  components: {
    VNumberInput,
  },
});
