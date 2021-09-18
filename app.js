const inputAuthor = document.querySelector('.input-author');
const inputTitle = document.querySelector('.input-title');
const addBtn = document.querySelector('.add-btn');
const inputData = document.querySelector('.input-data');

class Book {
  constructor(inputTitle, inputAuthor) {
    this.inputTitle = inputTitle;
    this.inputAuthor = inputAuthor;
  }

  displayBooks() {
    this.inputTitle = inputTitle;
    inputData.innerHTML = '';
    localStorage.getItem('book');
    const bookItem = JSON.parse(localStorage.getItem('book') || '[]');
    bookItem.forEach(({ title, author, id }) => {
      const div = document.createElement('div');
      div.classList.add('user-details');
      div.innerHTML = ` <div>"${title}" by ${author}</div>
                        <button class='remove-btn' id='${id}'>Remove</button>
                        `;
      inputData.appendChild(div);
    });
  }

  deleteBook(el) {
    const books = JSON.parse(localStorage.getItem('book'));
    localStorage.setItem('book', JSON.stringify(books));
    const { id } = el;
    localStorage.setItem('book', JSON.stringify(books.filter((book) => book.id !== id)));
    this.displayBooks();
  }
}

const book = new Book(inputTitle, inputAuthor);

addBtn.addEventListener('click', () => {
  if ((inputTitle.value && inputAuthor.value) === '') {
    // eslint-disable-next-line no-alert
    alert('You cannot add empty fields');
  } else {
    const books = JSON.parse(localStorage.getItem('book') || '[]');
    const id = Math.random().toString(36).substr(0, 5);
    books.push({ title: inputTitle.value, author: inputAuthor.value, id });
    localStorage.setItem('book', JSON.stringify(books));
    book.displayBooks();
    inputAuthor.value = '';
    inputTitle.value = '';
  }
});

inputData.addEventListener('click', (e) => {
  book.deleteBook(e.target);
});

book.displayBooks();