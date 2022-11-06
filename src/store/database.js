import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    myDocuments: [],
    loadingState: false,
  }),
  actions: {
    async getOrders() {
      if (this.documents.length !== 0) {
        return;
      }
      try {
        // this.loadingState = true;
        const q = query(collection(db, "orders"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          this.documents.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      } finally {
        // this.loadingState = false;
      }
    },
    async addOrder(device) {
      try {
        const objetoDoc = {
          type: device.type,
          description: device.failure,
          customer: device.customer,
          accesories: device.accesories,
        };
        const docRef = await addDoc(collection(db, "orders"), objetoDoc);
        this.documents.push({ id: docRef.id, ...objetoDoc });
        router.push("/");
      } catch (error) {
        return error.code;
      }
    },
    async readOrder(id) {
      try {
        const docRef = doc(db, "orders", id);
        const docSpan = await getDoc(docRef);
        return docSpan.data();
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateOrder(id, order) {
      try {
        const docRef = doc(db, "orders", id);
        const docSpan = await getDoc(docRef);
        this.documents = this.documents.map((order) =>
          order.id === id
            ? {
                ordertype: order.value.type,
                description: order.value.description,
                ...order,
              }
            : order
        );
        await updateDoc(docRef, {
          type: order.value.type,
          description: order.value.description,
        });
        router.push("/");
      } catch (error) {
        // console.log(error.message);
      }
      console.log(id, order.value.type);
    },
    async finishOrder(id, diagnostic) {
      const docRef = doc(db, "orders", id);
      const docSpan = await getDoc(docRef);
      this.documents = this.documents.map((order) =>
        order.id === id
          ? {
              diagnostic: diagnostic,
              finished: true,
              ...order,
            }
          : order
      );
      await updateDoc(docRef, {
        diagnostic: diagnostic,
        finished: true,
      });
      router.push("record");
      console.log(this.documents);
    },
    async deleteOrder(id) {
      try {
        this.documents = this.documents.filter((order) => order.id !== id);
        this.myDocuments = this.myDocuments.filter((item) => item.id !== id);
        const docRef = doc(db, "orders", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async takeOrder(id) {
      try {
        this.documents = this.documents.map((item) =>
          item.id === id
            ? {
                ...item,
                tech: auth.currentUser.email,
              }
            : item
        );

        const docRef = doc(db, "orders", id);
        await updateDoc(docRef, {
          tech: auth.currentUser.email,
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    async getMyOrders() {
      this.myDocuments = this.documents.filter(
        (item) => item.tech === auth.currentUser.email && !item.finished
      );
      console.log(this.documents);
    },
    async leaveOrder(id) {
      try {
        this.documents = this.documents.map((item) =>
          item.id === id
            ? {
                ...item,
                tech: null,
              }
            : item
        );
        this.myDocuments = this.myDocuments.filter((item) => item.id !== id);
        const docRef = doc(db, "orders", id);
        await updateDoc(docRef, {
          tech: null,
        });
      } catch (error) {
        console.log(error.message);
      }
    },
  },
});
