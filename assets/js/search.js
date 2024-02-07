document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  get,
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



const book_title_div=document.querySelector('#book_title_div')


