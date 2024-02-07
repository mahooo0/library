// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  get,
  child,
  set,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Initialize Firebase


// console.log("app" , app);
const firebaseConfig = {
  apiKey: "AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c",
  authDomain: "library-35b3c.firebaseapp.com",
  databaseURL: "https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "library-35b3c",
  storageBucket: "library-35b3c.appspot.com",
  messagingSenderId: "498632706422",
  appId: "1:498632706422:web:9d181dd4820520b7c01257"
};

  const app = initializeApp(firebaseConfig);

  const db = getDatabase();
  console.log(db);


const aboutInfoBtn = document.querySelector("#about-info-add");

aboutInfoBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const aboutTitle = document.querySelector("#aboutTitle").value;
  const aboutBookImg = document.querySelector("#aboutBookImg").value;
  const aboutDesc = document.querySelector("#aboutDesc").value;


    // check edirik bos xana varsa
    if (!aboutTitle || !aboutBookImg || !aboutDesc) {
      alert("Please fill in all fields");
      return; // Stop further execution
    }

  //inputa daxil etdiyimiz valuelari objecte ceviririk
  let aboutBookData = {
    aboutTitle,
    aboutBookImg,
    aboutDesc,
  };
  console.log("newdata" ,aboutBookData );

  //database'da ishlediyimiz qola set edirik
  set(ref(db, "about-info/"), aboutBookData)
    .then(() => {
      alert("Data set successfully!")
      console.log("Data set successfully!");
    })
    .catch((error) => {
      alert("Error setting data: ")
      console.error("Error setting data: ", error);
    });
});









