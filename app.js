const  inputAuthor  = document.querySelector('.input-author');
const  inputTitle = document.querySelector('.input-title');
const  addBtn = document.querySelector('.add-btn');
const inputData = document.querySelector('.input-data');

const displayBooks = () => {
    inputData.innerHTML = '';
    localStorage.getItem('book');
    const bookItem = JSON.parse(localStorage.getItem('book') || '[]');
    bookItem.forEach(({title, author, id }) => {
        const div = document.createElement('div');
        div.innerHTML= `<div>title: ${title}</div>
                    <div>author: ${author}</div><br>
                    <button class='remove-btn' id='${id}'>Remove</button>
                    <hr>`;
        inputData.appendChild(div)
        
    });
}

const deleteBook = (el) => {
    const books = JSON.parse(localStorage.getItem('book'))
    localStorage.setItem('book', JSON.stringify(books));
    const { id } = el;
    localStorage.setItem('book', JSON.stringify(books.filter((book)=> book.id !== id)))
    displayBooks()
}

addBtn.addEventListener('click', ()=>{
    const books = JSON.parse(localStorage.getItem('book') || '[]');
    const id = Math.random().toString(36).substr(0,5);
    books.push({title:inputTitle.value, author:inputAuthor.value, id:id});
    localStorage.setItem('book', JSON.stringify(books))
    displayBooks()
    inputAuthor.value = '';
    inputTitle.value = '';
});


inputData.addEventListener('click', (e)=> {
    deleteBook(e.target)
});

displayBooks()