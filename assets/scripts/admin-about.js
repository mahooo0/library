// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAn-qATiDZGWx2jT-uWIaluHogmLQWYOzk",
  authDomain: "lib-project-b797f.firebaseapp.com",
  databaseURL: "https://lib-project-b797f-default-rtdb.firebaseio.com",
  projectId: "lib-project-b797f",
  storageBucket: "lib-project-b797f.appspot.com",
  messagingSenderId: "220675179309",
  appId: "1:220675179309:web:9a68a354b82c9dcb0e09a4",
  measurementId: "G-2RQJ6ZMKH9",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();
// console.log(db);
// console.log("app" , app);




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









