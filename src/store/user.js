import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import router from "../router";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      userData: null,
      loadingState: false,
    };
  },
  actions: {
    async registerUser(email, password) {
      this.loadingState = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingState = false;
        await router.push("/");
      }
    },
    async loginUser(email, password) {
      this.loadingState = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingState = false;
        await router.push("/");
      }
    },
    async logOut() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
});
