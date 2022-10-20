import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
      loadingSession: false,
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
      this.loadingSession = true;
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
      this.loadingSession = false;
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
    currentUser() {
      return new Promise((res, rej) => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            this.userData = { email: user.email, uid: user.uid };
          } else {
            this.userData = null;
          }
          res(user);
        });
        unsuscribe();
        (e) => rej(e);
      });
    },
  },
});
