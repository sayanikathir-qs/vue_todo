
import { defineStore } from "pinia";
import { loginApi } from "../utils/api";
import VueCookies from "vue-cookies";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: VueCookies.get("token") || null,
  }),

  actions: {
    async login(username, password) {
     
      const data = await loginApi({ username, password });

     
      this.user = {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      
      this.token = data.accessToken;
      VueCookies.set("token", data.accessToken);
    },

    logout() {
      this.user = null;
      this.token = null;

      // Remove cookie
      VueCookies.remove("token");
    },
  },
});
