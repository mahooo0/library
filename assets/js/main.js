


// const inputSearchEl = document.querySelector('#inputSearchEl');
// const searchBtnEl = document.querySelector('#searchBtnEl');
// const bookEl = document.querySelector('#bookEl');


// const databaseRef=ref(database,'books')




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
