import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c",
  authDomain: "library-35b3c.firebaseapp.com",
  databaseURL:
    "https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "library-35b3c",
  storageBucket: "library-35b3c.appspot.com",
  messagingSenderId: "498632706422",
  appId: "1:498632706422:web:9d181dd4820520b7c01257",
};

initializeApp(firebaseConfig);
const db = getDatabase();
// console.log(db);

//client side contact

document.getElementById("sendBtn").addEventListener("click", function (event) {
  event.preventDefault();

  var fullname = document.getElementById("fullname").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;
  var note = document.getElementById("note").value;

  if (!fullname || !email || !address || !phone || !note) {
    alert("Please fill in all fields!");
    console.log("err");
  } else {
    var formData = {
      fullname: fullname,
      email: email,
      address: address,
      phone: phone,
      note: note,
    };
    // alert("data sended")
    console.log(formData);

    const dbref = ref(db, "contact-us/");
    push(dbref, {
      fullname: fullname,
      email: email,
      address: address,
      phone: phone,
      note: note,
    })
      .then(() => {
        alert("data sended");
      })
      .catch((err) => {
        alert("err", err);
      });
  }
});
