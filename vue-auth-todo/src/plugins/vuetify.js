// src/plugins/vuetify.js

// Styles
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

// Icons (optional but recommended)
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { mdiAccount, mdiLock } from "@mdi/js"; // example icons

// Components & Directives
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,

  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
