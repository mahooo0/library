
// Anar's code start
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

// HTML elementleri

const search_Input = document.querySelector('#search_Input');
const search_Btn = document.querySelector('#search_Btn');
const search_variant = document.querySelector('#search_variant');
const book_add = document.querySelector('#book_add');
const book_form_div = document.querySelector('#book_form_div');
// HTML book form elementleri
const form_section_title = document.querySelector('#form_section_title');
const form_section_autor = document.querySelector('#form_section_autor');
const form_section_img = document.querySelector('#form_section_img');
const form_textarea = document.querySelector('#form_textarea');
const form_section_type = document.querySelector('#form_section_type');

// Google Books API'sinden kitapları alan fonksiyon

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

// Kitap variyantlarini gosteren fonksiyon
async function showBookVariants(books) {

  let bookdata = books.map((book) => {
    return `
      <div class="variant-details" id="variant">
        <h3>${book.volumeInfo.title}</h3>
      </div>
    `;
  });
  search_variant.innerHTML = bookdata.join(' ');

  const variants = document.querySelectorAll('.variant-details');
  variants.forEach((variant) => {
    variant.addEventListener('click', () =>
      fillFormInputs(variant.textContent.trim(), books)
    );
  });
}

// Formu dolduran funksiya
function fillFormInputs(selectedTitle, books) {
  const selectedBook = books.find(
    (book) => book.volumeInfo.title === selectedTitle
  );

  if (!selectedBook) {
    console.error('Selected book not found.');
    alert('Please fill in all fields!');
    return;
  }

  const titleInput = selectedBook.volumeInfo.title || 'Unknown Title';
  const imageUrlInput =
    selectedBook.volumeInfo.imageLinks?.thumbnail || '/assets/img/default.png';
  const descriptionInput =
    selectedBook.volumeInfo.description || 'No Description Available';
  const authorInput = selectedBook.volumeInfo.authors || 'Unknown Author';
  const bookTypeInput = selectedBook.volumeInfo.categories && selectedBook.volumeInfo.categories.length > 0
    ? selectedBook.volumeInfo.categories.join(', ') 
    : 'Unknown Type';

  form_section_title.value = titleInput;
  form_section_autor.value = authorInput;
  form_section_img.value = imageUrlInput;
  form_textarea.value = descriptionInput;
  form_section_type.value = bookTypeInput;
  console.log(form_section_type);
}

// Firebase'e kitap elave eden funksiya
async function addBookToFirebase(bookData) {
  try {
    const booksRef = ref(database, 'books');
    await push(booksRef, bookData);
    alert('Kitab uğurla Firebase-ə əlavə edildi!');
  } catch (error) {
    console.error('Error adding book to Firebase:', error);
    throw error; // 
  }
}

// Formdaki setrleri temizleyen funksiya
function clearFormInputs() {
  form_section_title.value = '';
  form_section_autor.value = '';
  form_section_img.value = '';
  form_textarea.value = '';
  form_section_type.value = '';
  search_Input.value='';
}

// Form setrlerini tesdiq eden funksiya
function validateFormInputs(formInputs) {
  return (
    formInputs.title &&
    formInputs.author &&
    formInputs.imageUrl &&
    formInputs.description &&
    formInputs.bookType
  );
}

book_form_div.addEventListener('click', (event) => {
  if (!event.target.matches('#book_add')) return;

  const formInputs = getFormInputs();

  // Form setrlerini tesdiqetme
  if (!validateFormInputs(formInputs)) {
    alert('Please fill in all fields!');
    return;
  }

  // butun setrler dogrudursa firebase kitab elave et
  const bookData = {
    title: formInputs.title,
    author: formInputs.author,
    imageUrl: formInputs.imageUrl,
    description: formInputs.description,
    bookType: formInputs.bookType,
    Date: Date.now(),
  };

  addBookToFirebase(bookData);

  // Her shey dogrudursa formu temizle
  clearFormInputs();
  search_variant.style.display='none'
});

// Formadan daxil olan məlumatları qəbul edən və qaytaran funksiya
function getFormInputs() {
  const title = form_section_title.value.trim();
  const author = form_section_autor.value.trim();
  const imageUrl = form_section_img.value.trim();
  const description = form_textarea.value.trim();
  // Sətir üçün bookType-ı yoxlayır və əgər bu sadəcə bir sətirdirsə .trim() metodunu çağırır
  const bookTypeValue = typeof form_section_type.value === 'string' ? form_section_type.value.trim() : form_section_type.value;
  return { title, author, imageUrl, description, bookType: bookTypeValue };
}

search_Input.addEventListener('input', async () => {
  const searchTerm = search_Input.value.trim();
  if (searchTerm.length == 0) {
    search_variant.style.display='block'
  }
  if (searchTerm.length > 0) {
    const data = await getBooks(searchTerm);
    if (data && data.items) {
      showBookVariants(data.items);
    }
    displayFunk(search_variant);
  }
});

// Elementin görünmesi ucun funksiya
function displayFunk(el) {
  let class_List = el.classList;
  if (class_List.contains('d-none')) {
    el.classList.remove('d-none');
  }
// Anar's code finish 
}
//  admin panel entering
const admin_panel_btn= document.querySelector("#admin_panel_btn")
let userName_inp=document.querySelector("#admin_panel_username")
let Password_inp=document.querySelector("#admin_panel_pasword")
let admin_auth=document.querySelector("#admin_auth")
let admin_main=document.querySelector("#admin_main")
let log_outh=document.querySelector("#log_outh")

admin_panel_btn.addEventListener("click", ()=>{
let userName=userName_inp.value
let Password=Password_inp.value

if(!userName||!Password){
  alert('Please fill in all fields!')
}
if (userName==="admin"&&Password==="admin"){
  admin_auth.classList.add("d-none")
  admin_main.classList.remove("d-none")
 
}else{
  alert("u wrote somthing wrong")
}

})

log_outh.addEventListener("click",()=>{
  admin_auth.classList.remove("d-none")
  admin_main.classList.add("d-none")
})