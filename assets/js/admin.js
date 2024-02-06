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

// HTML elementleri
const search_Input = document.querySelector('#search_Input');
const search_Btn = document.querySelector('#search_Btn');
const search_variant = document.querySelector('#search_variant');
const book_add = document.querySelector('#book_add');

const book_form_div = document.querySelector('#book_form_div');


search_Input.addEventListener('input', async () => {
  const searchTerm = search_Input.value.trim();
  if (searchTerm.length == 0) {
    search_variant.classList.add('d-none');
  }
  if (searchTerm.length > 0) {
    const data = await getBooks(searchTerm);
    if (data && data.items) {
      showBookVariants(data.items);
    }
    displayFunk(search_variant);
  }
});

// Google Books API'sinden kitapları alan funksiya
async function getBooks(searchTerm) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );
    if (!response.ok) {
      throw new Error('API request failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    return null;
  }
}

// Kitap variyantlarini gosteren funksiya
async function showBookVariants(books) {
  let bookdata = books.map((book) => {
    return `
         
            <div class="variant-details" id="variant">
                <h3>${book.volumeInfo.title}</h3>
            
            
            </div>
        `;
  });

  search_variant.innerHTML = bookdata.join(' ');
  const variant = document.querySelector('#variant');
  variant.addEventListener('click', (s) => {
    let seachBook = s.target.innerHTML;
    let filterBook = books.filter((e) => {
      if (e.volumeInfo.title == seachBook) {
        return e;
      }
    });
    console.log(filterBook);

    const titleInput = filterBook[0].volumeInfo.title || 'Unknown Title';
    const imageUrlInput =
      filterBook[0].volumeInfo.imageLinks?.thumbnail || '/assets/img/default.png';
    const descriptionInput =
      filterBook[0].volumeInfo.description || 'No Description Available';
    const authorInput = filterBook[0].volumeInfo.authors || 'Unknown Author';
    const bookTypeInput = filterBook[0].volumeInfo.categories || 'Unknown Type';

    book_form_div.innerHTML = `
              
                    <div class="book_form_secion">
                        <h2 class="book_form_secion_title">Book Name</h2>
                        <input type="text" class="book_form_secion_inp" value="${titleInput}" placeholder="Angels">
                    </div>
                    <div class="book_form_secion">
                        <h2 class="book_form_secion_title">Author Name</h2>
                        <input type="text" class="book_form_secion_inp" value="${authorInput}" placeholder="Dan Brown">
                    </div>
                    <div class="book_form_secion">
                        <h2 class="book_form_secion_title">Book Image Url</h2>
                        <input type="text" class="book_form_secion_inp" placeholder="Alex Smith" value="${imageUrlInput}">
                    </div>
                    <div class="book_form_secion">
                        <h2 class="book_form_secion_title"> Description</h2>
                        <textarea cols="30" rows="10" class="description_inp" placeholder="We work without holidays and weekends! Resident...We work without holidays and weekends! Resident...We work without holidays and weekends! Resident...">${descriptionInput}</textarea>
                    </div>
                    <div class="book_form_secion">
                        <h2 class="book_form_secion_title">Book Type</h2>
                        <input type="text" class="book_form_secion_inp" value="${bookTypeInput}" placeholder="fantastic">
                    </div>
                    <button class="book_form_secion_btn">add</button>
              
            `;



  

          
            book_form_div.addEventListener('click', () => {
                
       
      const bookData = {
        title: titleInput,
        author: authorInput[0],
        imageUrl: imageUrlInput,
        description: descriptionInput,
        bookType: bookTypeInput[0],
        Date:Date.now()
      };
      addBookToFirebase(bookData);
   

      titleInput.value = '';
      authorInput.value = '';
      imageUrlInput.value = '';
      descriptionInput.value = '';
      bookTypeInput.value = '';
    });
  });
}

// Elementin gorsenmeyi ucun funksiya
function displayFunk(el) {
  let class_List = el.classList;
  if (class_List.contains('d-none')) {
    el.classList.remove('d-none');
  }
}

// Firebase'e kitablari atan funksiya
function addBookToFirebase(bookData) {
  const booksRef = ref(database, 'books');
  push(booksRef, bookData);
}
