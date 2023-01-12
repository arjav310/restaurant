import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9HsmfBKMdlZm104AAtA5tJJTB-1YSh9U",
  authDomain: "restaurantapp-310.firebaseapp.com",
  databaseURL: "https://restaurantapp-310-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-310",
  storageBucket: "restaurantapp-310.appspot.com",
  messagingSenderId: "376058050704",
  appId: "1:376058050704:web:28c7ba85703764fa500015",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
