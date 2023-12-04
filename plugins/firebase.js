//import firebase from "firebase/app";
//import "firebase/firestore";

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(nuxtApp => {

const firebaseConfig = {
  apiKey: "AIzaSyCtgjnqp90ZIMl-Nqs8DrfhdkOmRqZ9kM0",
  authDomain: "invoice-app-96669.firebaseapp.com",
  projectId: "invoice-app-96669",
  storageBucket: "invoice-app-96669.appspot.com",
  messagingSenderId: "910581252928",
  appId: "1:910581252928:web:8cea7f5c2560c3198e30a5"
};

//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig)

//const db = firebase.firestore();
const db = getFirestore(app)

nuxtApp.vueApp.provide('db', db)
nuxtApp.provide('db', db)

//console.log(db);

})