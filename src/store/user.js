import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import router from "../router";
import { useDatabaseStore } from "./database";

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
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        await router.push("/login");
      } catch (error) {
        console.log(error.code);
        return error.code;
      } finally {
        this.loadingState = false;
      }
    },
    async loginUser(email, password) {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        await router.push("/");
      } catch (error) {
        return error.code;
      } finally {
      }
    },
    async logOut() {
      const databaseStore = useDatabaseStore();
      databaseStore.$reset();
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
