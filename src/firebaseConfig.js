import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDR2ptXxwPo-lz3-ZNvLTJxbsAPNSLe_18",
  authDomain: "my-vue-project-1-47fb1.firebaseapp.com",
  projectId: "my-vue-project-1-47fb1",
  storageBucket: "my-vue-project-1-47fb1.appspot.com",
  messagingSenderId: "360291537457",
  appId: "1:360291537457:web:6bc61cfc57f4ecdff0bb10",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export { auth, db };
