

      
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getDatabase, ref, orderByChild, startAt, endAt, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


// const firebaseConfig = {
//     apiKey: "AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c",
//     authDomain: "library-35b3c.firebaseapp.com",
//     projectId: "library-35b3c",
//     storageBucket: "library-35b3c.appspot.com",
//     messagingSenderId: "498632706422",
//     appId: "1:498632706422:web:9d181dd4820520b7c01257",
//     databaseURL: "https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app"
// };


// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// const inputSearchEl = document.querySelector('#inputSearchEl');
// const searchBtnEl = document.querySelector('#searchBtnEl');
// const bookEl = document.querySelector('#bookEl');

// const databaseRef = ref(database, 'books');





// inputSearchEl.addEventListener('input', async () => {
//   const searchTerm = inputSearchEl.value.trim();
//   if (searchTerm.length === 0) {
//     bookEl.innerHTML = ''; // input bos olanda kitablari sifirla
//     return;
//   }

//   const data = await getBooks(searchTerm);
//   if (data && data.items) {
//     bookEl.innerHTML = '';
//     data.items.forEach(book => {
//       const bookDiv = document.createElement('div');
//       bookDiv.classList.add('box2');
//       bookDiv.innerHTML = `
//         <div class="book1">
//           <img class="book" src="${book.volumeInfo.imageLinks?.thumbnail || '../images/image 2.png'}" alt="Book Image">
//         </div>
//         <div class="book_title">
//           <h2 class="book_name">${book.volumeInfo.title}</h2>
//           <p class="author">${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
//           <p class="title">${book.volumeInfo.description || 'No description available'}</p>
//         </div>
//       `;
//       bookEl.appendChild(bookDiv);
//     });
//   }
// });
  
// async function showBookVariants(books) {
//     search_variant.innerHTML = '';
//     books.forEach((book) => {
//         const variantDiv = document.createElement('div');
//         variantDiv.classList.add('variant');
//         variantDiv.innerHTML = `
          
//             <div class="variant-details">
//                 <h3>${book.volumeInfo.title}</h3>
//                 <p>${
//                     book.volumeInfo.authors
//                     ? book.volumeInfo.authors.join(', ')
//                     : 'Unknown Author'
//                 }</p>
//                 <p>${book.volumeInfo.publisher || 'Unknown Publisher'}</p>
//                 <p>${book.volumeInfo.publishedDate || 'Unknown Date'}</p>
//             </div>
//         `;
//         variantDiv.addEventListener('click', () => {

//          search_Input.value=book.volumeInfo.title || "unkown title";
//             search_variant.innerHTML = ''; // Hazırki məlumatları təmizləyir
//             variantDiv.classList.remove('variant');
//             variantDiv.classList.add('selected-variant');
//             variantDiv.style.width = '100%';
//             variantDiv.style.height = '100%';
//             variantDiv.style.padding = '30px';
//             variantDiv.style.marginLeft = '30px';
//             variantDiv.style.gap = '40px';
//             variantDiv.style.marginTop='20px'
//          fillBookForm(book);
//          search_variant.parentNode.insertBefore(bookFormContainer, search_variant.nextSibling);
//          bookFormContainer.appendChild(book_form_div);

//             const titleInput = book.volumeInfo.title || 'Unknown Title';
//             const imageUrlInput = book.volumeInfo.imageLinks?.thumbnail || '/assets/img/default.png';
//             const descriptionInput = book.volumeInfo.description || 'No Description Available';
//             const authorInput = book.volumeInfo.authors || 'Unknown Author';
//             const bookTypeInput = book.volumeInfo.categories || 'Unknown Type'; 

//             book_form_div.innerHTML = `
               
//                     <div class="book_form_secion">
//                         <h2 class="book_form_secion_title">Book Name</h2>
//                         <input type="text" class="book_form_secion_inp" value="${titleInput}" placeholder="Angels">
//                     </div>
//                     <div class="book_form_secion">
//                         <h2 class="book_form_secion_title">Author Name</h2>
//                         <input type="text" class="book_form_secion_inp" value="${authorInput}" placeholder="Dan Brown">
//                     </div>
//                     <div class="book_form_secion">
//                         <h2 class="book_form_secion_title">Book Image Url</h2>
//                         <input type="text" class="book_form_secion_inp" placeholder="Alex Smith" value="${imageUrlInput}">
//                     </div>
//                     <div class="book_form_secion">
//                         <h2 class="book_form_secion_title"> Description</h2>
//                         <textarea name="" id="" cols="30" rows="10" class="description_inp" placeholder="We work without holidays and weekends! Resident...We work without holidays and weekends! Resident...We work without holidays and weekends! Resident...">${descriptionInput}</textarea>
//                     </div>
//                     <div class="book_form_secion">
//                         <h2 class="book_form_secion_title">Book Type</h2>
//                         <input type="text" class="book_form_secion_inp" value="${bookTypeInput}" placeholder="fantastic">
//                     </div>
//                     <button class="book_form_secion_btn">add</button>
               
//             `;

//             search_variant.appendChild(variantDiv);
//             search_variant.appendChild(book_form_div);

//             const inputFields =book_form_div.querySelectorAll('.book_form_secion_inp');
//             inputFields.forEach((input) => {
//                 input.addEventListener('input', () => {
//                     const value = input.value;
//                     const id = input.getAttribute('id');
//                     const targetInput = book_form_div.querySelector(`#${id}`);
//                     if (targetInput) {
//                         targetInput.value = value;
//                     }
//                 });
//             });

//             const addBtn =book_form_div.querySelector('.book_form_secion_btn');
//             addBtn.addEventListener('click', () => {
//                 const bookData = {
//                     title: titleInput,
//                     author: authorInput,
//                     imageUrl: imageUrlInput,
//                     description: descriptionInput,
//                     bookType: bookTypeInput
//                 }
//                 addBookToFirebase(bookData);
//                 addBtn.textContent='Addet';
//                 addBtn.disabled=true;

//                 search_Input.value = '';
              
//                 titleInput.value='Angels';
//                 authorInput.value='';
//                 imageUrlInput.value='';
//                 descriptionInput.value='';
//                 bookTypeInput.value='';
//             });
//         });
//         search_variant.appendChild(variantDiv);
//     });
// }

// function displayFunk(el) {
//     let class_List = el.classList;
//     if (class_List.contains('d-none')) {
//         el.classList.remove('d-none');
//     }
// }

// function addBookToFirebase(bookData) {
//     const booksRef = ref(database, 'books');
//     push(booksRef, bookData);
// }
