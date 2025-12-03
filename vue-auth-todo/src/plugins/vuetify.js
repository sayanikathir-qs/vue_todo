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

  theme: {
    themes: {
      light: {
        colors: {
          primary: '#272829ff',      // Change this color
          secondary: '#424242',
          accent: '#82b1ff',
          error: '#ff5252',
          warning: '#ffc107',
          info: '#2196f3',
          success: '#4caf50',
        },
      },
    },
  },

  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
