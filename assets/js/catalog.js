document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    // Swiper ayarları buraya gelecek
    slidesPerView: 1,
    spaceBetween: 10,
    // Diğer ayarlar...
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
});

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

  const db = getDatabase(app);
//catalog el
const swiper_wrapper=document.querySelector("#swiper_wrapper")
const button_prev=document.querySelector("#button_prev")
const button_next=document.querySelector("#button_next")

  function displayAllBookstData() {
    const dbref = ref(db, "books/");
  
    onValue(
      dbref,
      (snapshot) => {
        const data = snapshot.val();
        let result = Object.values(data)
        let s=Math.floor(result.length/5)
        let SLIDES_arr=[]
        for( let i=0;i<s;i++){
          if(result.length>4){
            let slide_arr=[]
            slide_arr.push(result[0],result[1],result[2],result[3],result[4])
            SLIDES_arr.push(slide_arr)
            result= result.slice(5)
          }
       
          
        }
        let slider_html_arr=SLIDES_arr.map((item,i,list)=>{

          let slide=item.map((item)=>{
          
            result=`
            <div class="book_box">
          
        <img src="${item.imageUrl}" alt="" class="box_book_img">
        <h4 class="box_book_name"${item.title}</h4>
        <h5 class="box_book_autor">${item.author}</h5>
        <button class="box_book_btn">Read more</button>
        <!-- add id to button in catalog js-->
          </div>
            `
            return result

          })
          
          let slide_el_result=slide.join("")
          let SLIDER_result=`
          <div class="swiper-slide">
          ${slide_el_result}
          </div>
          `
          return SLIDER_result
        })
        let slider_html=slider_html_arr.join("")
        swiper_wrapper.innerHTML=slider_html
        
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }
  displayAllBookstData()
  
  // console.log(books);