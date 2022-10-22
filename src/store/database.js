import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingState: false,
  }),
  actions: {
    async getOrders() {
      if (this.documents.length !== 0) {
        return;
      }
      try {
        this.loadingState = true;
        const q = query(collection(db, "orders"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          this.documents.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingState = false;
      }
    },
    async addOrder(device) {
      try {
        const objetoDoc = {
          type: device.type,
          description: device.description,
          customer: device.customer,
          addedBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "orders"), objetoDoc);
        this.documents.push({ id: docRef.id, ...objetoDoc });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteOrder(id) {
      try {
        const docRef = doc(db, "orders", id);
        await deleteDoc(docRef);
        this.documents = this.documents.filter((order) => {
          order.id !== id;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
