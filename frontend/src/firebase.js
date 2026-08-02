import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBoTlaVMQ5cUPAWUKxYX-ar9GQtx4lFeiQ",
    authDomain: "bankebiharijewellers-f51d6.firebaseapp.com",
    projectId: "bankebiharijewellers-f51d6",
    storageBucket: "bankebiharijewellers-f51d6.firebasestorage.app",
    messagingSenderId: "38211634663",
    appId: "1:38211634663:web:22edf63740cae095b56942",
    measurementId: "G-142L35X344"
  };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);