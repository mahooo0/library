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

//admin side contact

let contactName = document.querySelector("#contactName");
let contactAdress = document.querySelector("#contactAdress");
let contactEmail = document.querySelector("#contactEmail");
let contactNum = document.querySelector("#contactNum");

function displayContactData() {
  const dbref = ref(db, "contact-us/");
  const tableBody = document.getElementById("table_body");

  onValue(
    dbref,
    (snapshot) => {
      const data = snapshot.val();

      // Clear existing table rows
      tableBody.innerHTML = "";

      // Check if data exists
      if (data) {
        // Iterate over each contact
        Object.keys(data).forEach((key, index) => {
          const contact = data[key];
          // console.log(contact);

          // Create a new table row
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td class="th_num">${index + 1}</td>
            <td class="th_book_title">${contact.fullname}</td>
            <td class="th_book_description">${contact.address}</td>
            <td class="th_book_Category">${contact.email}</td>
            <td class="th_book_author">${contact.phone}</td>
          `;

          // Append the new row to the table body
          tableBody.appendChild(newRow);
        });
      }
    },
    (error) => {
      console.error("Error fetching data:", error);
    }
  );
}

window.onload = function () {
  displayContactData();
};