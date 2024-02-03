
const search_Input = document.querySelector('#search_Input');
const search_Btn = document.querySelector('#search_Btn');
const search_variant = document.querySelector('#search_variant');

search_Input.addEventListener('input', async () => {
    const searchTerm = search_Input.value.trim();
    if(searchTerm.length === 0){
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

async function getBooks(searchTerm) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        if (!response.ok) {
            throw new Error('API request failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        return null;
    }
}

function showBookVariants(books) {
    search_variant.innerHTML = '';
    books.forEach(book => {
        const variantDiv = document.createElement('div');
        variantDiv.classList.add('variant');
        variantDiv.innerHTML = `
            <img src="${book.volumeInfo.imageLinks?.thumbnail || '/assets/img/default.png'}" alt="Book Image">
            <p>${book.volumeInfo.title}</p>
        `;
        variantDiv.addEventListener('click', () => {
            const clone = variantDiv.cloneNode(true);
            clone.classList.remove('variant');
            search_variant.appendChild(clone);
            variantDiv.remove(); 
        });
        search_variant.appendChild(variantDiv);
    });
}

function displayFunk(el) {
    let class_List = el.classList;
    if(class_List.contains('d-none')){
        el.classList.remove('d-none');
    }
}
