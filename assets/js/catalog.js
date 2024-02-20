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
  apiKey: "AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c",
  authDomain: "library-35b3c.firebaseapp.com",
  databaseURL:
    "https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "library-35b3c",
  storageBucket: "library-35b3c.appspot.com",
  messagingSenderId: "498632706422",
  appId: "1:498632706422:web:9d181dd4820520b7c01257",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
//catalog el
const swiper_wrapper = document.querySelector("#swiper_wrapper");
const best_seller_swippwr = document.querySelector("#best_seller_swippwr");
const NEWbook = document.querySelector("#NEWbook");
const type_buttons_div = document.querySelector("#type_buttons_div");
const books_by_type = document.querySelector("#books_by_type");
const text_1 = document.querySelector("#text_1");
const new_div = document.querySelector("#new_div");

const commentsAbout = document.querySelector("#commentsAbout");
commentsAbout.style.display = "none";
const aboutBookContainer = document.querySelector("#aboutBookContainer");
aboutBookContainer.style.display = "none";

function displayAllBookstData() {
  const dbref = ref(db, "books/");
  const typeref=ref(db, "book-type/");
  let books_arr=[]
  

  onValue(dbref, (snapshot) => {
    const data = snapshot.val();
    let all_values = Object.values(data);
   for (let i =0;i<all_values.length;i++){
    books_arr.push(all_values[i])   }
    

    let all_books_slides_html = get_books(all_values, "all_books_read");
    swiper_wrapper.innerHTML = all_books_slides_html;

    // Adding event listeners for "read more"
    for (let i = 0; i < all_values.length; i++) {
      let el = document.querySelector(`#all_books_read_${i}`);

      if (el != null) {
        el.addEventListener("click", (event) => {
          event.preventDefault();
          displayBookDetails(all_values[i]);
        });
      }
    }

    // best sellers inner
    let best_seller_arr = all_values.filter(
      (item) => item.bookType === "best seller"
    );
    let best_seller_slides_html = get_books(
      best_seller_arr,
      "best_seller_read"
    );
    best_seller_swippwr.innerHTML = best_seller_slides_html;

    // event listeners for "read more" in best sellers section
    for (let i = 0; i < best_seller_arr.length; i++) {
      let el = document.querySelector(`#best_seller_read_${i}`);

      if (el != null) {
        el.addEventListener("click", (event) => {
          event.preventDefault();
          displayBookDetails(best_seller_arr[i]);
        });
      }
    }


    // new books inner
    let new_arr = all_values.filter((item) => item.isNew === true);
    // console.log(new_arr);
    let new_slides_html = get_books(new_arr, "new_read");
    NEWbook.innerHTML = new_slides_html;


    for (let i = 0; i < new_arr.length; i++) {
      let el = document.querySelector(`#new_read_${i}`);
      if (el != null) {
        el.addEventListener("click", (event) => {
          event.preventDefault();
          displayBookDetails(new_arr[i]);
        });
      }
    }
  });
  
  onValue(typeref,(snapshot)=>{
    const data =snapshot.val()
    console.log(books_arr);
    const all_values = Object.values(data);
    let butons_arr=[]
    for (let i=0;i<all_values.length;i++){
      let el =`<button id="type_button_${i}">${all_values[i].bookCategorie}</button>`
      butons_arr.push(el)
    }
    let type_buttons=butons_arr.join("")
    type_buttons_div.innerHTML=type_buttons
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    
    for (let s=0;s<all_values.length;s++){
      let button_el=document.querySelector(`#type_button_${s}`)
      button_el.addEventListener("click",()=>{
        if (button_el.classList.contains("active")) {
          button_el.classList.remove("active") 
          
        }else{
          button_el.classList.add("active") 
          
          let books_bytype=books_arr.filter(item=> {
            console.log(item.bookType,all_values[s].bookCategorie);
            
            if(item.bookType===all_values[s].bookCategorie){
              return true
            }
           
            return false
          })
          let html_1=get_books(books_bytype,`${all_values[s].bookCategorie}_${s}`)
          
        
          swiper_wrapper.innerHTML=html_1
          text_1.innerHTML=all_values[s].bookCategorie
        }
      })
    }
    
  })
  
  


}

function displayBookDetails(book) {
  const catalogBooksContainer = document.querySelector(
    "#catalogBooksContainer"
  );
  catalogBooksContainer.style.display = "none";


  const bookYearAbout = document.querySelector("#bookYearAbout");
  const bookNameAbout = document.querySelector("#bookNameAbout");
  const bookAuthorAbout = document.querySelector("#bookAuthorAbout");
  const bookDescriptionAbout = document.querySelector("#bookDescriptionAbout");
  const bookImgAbout = document.querySelector("#bookImgAbout");
  const dateWhenBookAdded = document.querySelector("#dateWhenBookAdded");
  const newIconAbout = document.querySelector("#newIcon"); 
  // const newIconTitle = document.querySelector("#newIconTitle")
  // newIconTitle.style.textAlign = 'center'
  if (book.isNew === 'true' || book.isNew === true) { // Check for string 'true' or boolean true
    newIconAbout.style.display = 'block';
    // newIconAbout.style.width = '100%'; 
    // newIconAbout.style.textAlign = 'right';
 
} else { 
    newIconAbout.style.display = 'none';
}


  console.log(book.isNew);

  // kitabin hansi gun  elave edildiyini gosteren
  function formatTimeSinceAdded(addedDate) {
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - addedDate;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays > 0) {
      return `${differenceInDays} day${
        differenceInDays !== 1 ? "s" : ""
      } ago added`;
    } else if (differenceInHours > 0) {
      return `${differenceInHours} hour${
        differenceInHours !== 1 ? "s" : ""
      } ago added`;
    } else if (differenceInMinutes > 0) {
      return `${differenceInMinutes} minute${
        differenceInMinutes !== 1 ? "s" : ""
      } ago added`;
    } else {
      return "Just now added";
    }
  }

  const dateAdded = new Date(book.Date);


  // nece gun evvel elave olundugunu gosteren
  dateWhenBookAdded.textContent = formatTimeSinceAdded(dateAdded);

  // kitab ili bolmesinde ancaq il hissesi gorsensin
  bookYearAbout.textContent = book.publicationYear.substring(0, 4);

  // bookYearAbout.textContent = book.publicationYear;
  bookNameAbout.textContent = book.title;
  bookAuthorAbout.textContent = book.author;
  bookDescriptionAbout.textContent = book.description;
  bookImgAbout.src = book.imageUrl;




  // kitablarin olcusunu about pagede deyishirik
  bookImgAbout.style.width = "379px";
  bookImgAbout.style.height = "529px";

  // console.log(this.all_values);




  


  // 250den cox oldugda ... ile evez edirik
  if (book.description.length > 250) {
    // add "..."
    bookDescriptionAbout.textContent =
      book.description.substring(0, 250) + "...";

    // ... click edende butun description gelsin
    bookDescriptionAbout.addEventListener("click", function () {
      bookDescriptionAbout.textContent = book.description;
    });
  } else {
    // 250den az veya 250dirse butun descriptionu gosteren
    bookDescriptionAbout.textContent = book.description;
  }

  const backButtonAbout = document.querySelector("#backButtonAbout");
  backButtonAbout.addEventListener("click", function () {
    aboutBookContainer.style.display = "none";
    catalogBooksContainer.style.display = "block";
    commentsAbout.style.display = "none"; // commentleri back click edende gizledir
  });

  aboutBookContainer.style.display = "flex";
  commentsAbout.style.display = "block";

  // Scroll edir sehife yuklenende yuxaridan baslamagi ucun
  window.scrollTo(0, 0);
}

displayAllBookstData();

function get_books(obj_arr, id) {
  //all books
  let books_html_arr = obj_arr.map((item, i) => {
    let button_id = `${id}_${i}`;
    // console.log(button_id);
    if(item.isNew==true){
      let resultN = `
              <div class="book_box"  >
            
          <img src="${item.imageUrl}" alt="" class="box_book_img">
          <h4 class="box_book_name"${item.title}</h4>
          <h5 class="box_book_autor">${item.author}</h5>
          <button id="${button_id}" class="readMoreBtn box_book_btn">Read more</button>
          <!-- add id to button in catalog js-->
          <div class="NEW">
            <p>NEW</p>
          </div>
            </div>
              `;
            return resultN
    }
    let result = `
              <div class="book_box"  >
            
          <img src="${item.imageUrl}" alt="" class="box_book_img">
          <h4 class="box_book_name"${item.title}</h4>
          <h5 class="box_book_autor">${item.author}</h5>
          <button id="${button_id}" class="readMoreBtn box_book_btn">Read more</button>
          <!-- add id to button in catalog js-->
            </div>
              `;
    return result;
  });

  let s = Math.floor(books_html_arr.length / 5);
  let SLIDES_arr = [];

  for (let i = 0; i < s; i++) {
    if (books_html_arr.length > 4) {
      let slide_arr = [];
      slide_arr.push(
        books_html_arr[0],
        books_html_arr[1],
        books_html_arr[2],
        books_html_arr[3],
        books_html_arr[4]
      );
      SLIDES_arr.push(slide_arr);
      books_html_arr = books_html_arr.slice(5);
    }
  }


  let SLIDES_html_arr = SLIDES_arr.map((item) => {
    let books_html_5 = item.join("");
    let SLIDER_result = `
             <div class="swiper-slide">
             ${books_html_5}
             </div>
             `;
    return SLIDER_result;
  });
  let slides_thml = SLIDES_html_arr.join("");
  return slides_thml;
}
