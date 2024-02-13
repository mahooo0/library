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
const best_seller_swippwr=document.querySelector("#best_seller_swippwr")
const NEWbook=document.querySelector("#NEWbook")

  function displayAllBookstData() {
    const dbref = ref(db, "books/");
  
    onValue(
      dbref,
      (snapshot) => {
        const data = snapshot.val();
        let all_values=Object.values(data)
        // all books inner 
        let all_books_slides_thml= get_books(all_values,"all_books_read")
        swiper_wrapper.innerHTML=all_books_slides_thml
        // all books inner 
        for (let i=0;i<all_values.length;i++){
          let el = document.querySelector(`#all_books_read_${i}`)
          if(el!=null){
            
            el.addEventListener("click",(()=>{
              let obj=all_values[i]
              console.log(obj);
              //JALƏ KODU BURA YAZ
            }))
          }
          
        }
        

        //best sellers inner

        let best_seller_arr=all_values.filter((item,i)=>{
          return item.bookType==="best seller" ? true :false ;
        })
        let best_seller_slides_thml= get_books(best_seller_arr,"best_seller_read")
        best_seller_swippwr.innerHTML=best_seller_slides_thml
        for (let i=0;i<all_values.length;i++){
          let el = document.querySelector(`#best_seller_read_${i}`)
          if(el!=null){
            
            el.addEventListener("click",(()=>{
              let obj=all_values[i]
              console.log(obj);
              //JALƏ KODU BURA YAZ
            }))
          } 
        }
        //best sellers inner

        

        //new book
        let new_arr=all_values.filter((item,i)=>{
          return item.isNew==true ? true :false ;
        })
        let new_slides_thml= get_books(new_arr,"new_read")
        NEWbook.innerHTML=new_slides_thml
        for (let i=0;i<all_values.length;i++){
          let el = document.querySelector(`#new_read_${i}`)
          if(el!=null){
            
            el.addEventListener("click",(()=>{
              let obj=all_values[i]
              console.log(obj);
              //JALƏ KODU BURA YAZ
            }))
          } 
        }
        let isNewCondition=(item)=>item.isNew==true ? true :false ;


      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }
  displayAllBookstData()
  
  // console.log(books);


// document.addEventListener("DOMContentLoaded", function () {

//   // function displayAllBookstData() {
//   //    document.addEventListener('click', function (event) {
//   //     if (event.target.classList.contains('readMoreBtn')) {
//   //         const bookId = event.target.getAttribute('data-id');
//   //         console.log('Clicked on book with ID:', bookId);
//   //         localStorage.setItem('selectedBookId', bookId);
//   //         event.preventDefault();
          
//   //     }
//   // });  
//   // }

//   // displayAllBookstData();



// });
function get_books(obj_arr,id){

        //all books
        let books_html_arr=obj_arr.map((item,i)=>{
          
          let button_id=`${id}_${i}`
          let result=`
              <div class="book_box"  >
            
          <img src="${item.imageUrl}" alt="" class="box_book_img">
          <h4 class="box_book_name"${item.title}</h4>
          <h5 class="box_book_autor">${item.author}</h5>
          <button id="${button_id}" class="readMoreBtn box_book_btn">Read more</button>
          <!-- add id to button in catalog js-->
            </div>
              `
          return result 
        })
        
        let s=Math.floor(books_html_arr.length/5)
        let SLIDES_arr=[]

        for( let i=0;i<s;i++){
          if(books_html_arr.length>4){
            let slide_arr=[]
            slide_arr.push(books_html_arr[0],books_html_arr[1],books_html_arr[2],books_html_arr[3],books_html_arr[4])
            SLIDES_arr.push(slide_arr)
            books_html_arr= books_html_arr.slice(5)
          }
        }
        

        let SLIDES_html_arr=SLIDES_arr.map(item=>{
          let books_html_5=item.join("")
          let SLIDER_result=`
             <div class="swiper-slide">
             ${books_html_5}
             </div>
             `
          return SLIDER_result
        })
        let slides_thml=SLIDES_html_arr.join("")
        return slides_thml
}
// .//book-page.html


function book_to_book_page(obj){
//JALƏ koudu bura yaz
console.log(obj);
}
// .//book-page.html