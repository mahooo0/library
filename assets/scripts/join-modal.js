
let joinBtn = document.querySelector("#joinBtn");
let joinModal = document.querySelector("#joinModal");
document.addEventListener("DOMContentLoaded", function () {
  //sehife tam acildiqdan sonra ishlesin

  //join buttonuna click etdikde modal acilsin
  joinBtn.addEventListener("click", function () {
    if (joinModal.style.display === "none" || joinModal.style.display === "") {
      joinModal.style.display = "block";
    } else {
      joinModal.style.display = "none";
    }
  });
});

//modaldan kenar her hansi bir yere click etdikde modal baglansin

window.addEventListener("click", function (event) {
  if (event.target === joinModal) {
    joinModal.style.display = "none";
  }
});

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c',
  authDomain: 'library-35b3c.firebaseapp.com',
  projectId: 'library-35b3c',
  storageBucket: 'library-35b3c.appspot.com',
  messagingSenderId: '498632706422',
  appId: '1:498632706422:web:9d181dd4820520b7c01257',
  databaseURL:
    'https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app',

};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// export const firebaseDatabase = getDatabase(firebaseApp);
export const firebaseDatabase = database;
//join us HTML el

const Join_btn=document.querySelector("#Join_btn")
//join info fire base
Join_btn.addEventListener("click",()=>{
  const Join_name=document.querySelector("#Join_name").value
  const Join_email=document.querySelector("#Join_email").value
  if(!Join_name||!Join_email){
    alert("please fill in all fields! ")
    return
  }
  let join_info={
    Join_name,
    Join_email
  }
console.log(join_info);
addJoinInfoToFirebase(join_info)






joinModal.style.display = "none";
document.querySelector("#Join_email").value=""
document.querySelector("#Join_name").value=""

})

async function addJoinInfoToFirebase(Data) {
  try {
    const joinRef = ref(database, 'join-info');
    await push(joinRef, Data);
    alert("join sucsesfully");
  } catch (error) {
    console.error('Error adding book to Firebase:', error);
    throw error; // 
  }
}