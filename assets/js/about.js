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

const app = initializeApp(firebaseConfig);
// console.log(app);

const db = getDatabase();
// console.log(db);

let aboutTitle = document.querySelector("#aboutTitle");
let aboutDesc = document.querySelector("#aboutDesc");
let aboutImage = document.querySelector("#aboutImage");
let aboutImageContainer = document.querySelector("#aboutImageContainer");

function getData() {
  const dbref = ref(db);

  get(child(dbref, "about-info/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        let dataArr = Object.entries(snapshot.val());
        // console.log(dataArr);
        dataArr.forEach((item) => {
          let elementId = item[0]; // 1ci elementi id olarag
          console.log(elementId);
          let htmlContent = item[1]; // 2ci innerhtml ile gostermek istediyimiz element
          //   console.log(htmlContent);

          switch (elementId) {
            case "aboutBookImg":
                aboutImageContainer.innerHTML = `<img id="aboutImage" class="img_1" src="${htmlContent}" alt="About Image"  >`;
              break;
            case "aboutDesc":
              aboutDesc.innerHTML = htmlContent;
              break;
            case "aboutTitle":
              aboutTitle.innerHTML = htmlContent;
              break;
            default:
              console.log(`Element with ID ${elementId} not recognized.`);
              break;
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// getData funskiyasini sehife acildiqda cagiririq
window.onload = function () {
  getData();
};
