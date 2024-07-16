import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyCuAYetfULLrLOqapLlPSKsZYAsayuU3wo",
    authDomain: "clabble.firebaseapp.com",
    projectId: "clabble",
    storageBucket: "clabble.appspot.com",
    messagingSenderId: "883036511741",
    appId: "1:883036511741:web:e9ccf1408a2b859c77cd94",
    measurementId: "G-57J111ZXBX"
  };

const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);