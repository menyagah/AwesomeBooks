const inputAuthor = document.querySelector('.input-author');
const inputTitle = document.querySelector('.input-title');
const addBtn = document.querySelector('.add-btn');
const inputData = document.querySelector('.input-data');
const dateMonth = document.querySelector('.datetime');

const listBtn = document.querySelector('#list-link');
const addBookBtn = document.querySelector('#addlink');
const contactBtn = document.querySelector('#contact-link');

const displayList = document.querySelector('#books-display');
const displayHeading = document.querySelector('#h1');
const displayInputs = document.querySelector('#show-form');
const displayContact = document.querySelector('#contacts');
const displayMainHeader = document.querySelector('#top-text');

listBtn.addEventListener('click', () => {
  displayList.classList.remove('hide');
  displayHeading.classList.add('hide');
  displayContact.classList.add('hide');
  displayInputs.classList.add('hide');
  displayMainHeader.classList.remove('hide');
});

addBookBtn.addEventListener('click', () => {
  displayInputs.classList.remove('hide');
  displayHeading.classList.remove('hide');
  displayList.classList.add('hide');
  displayMainHeader.classList.add('hide');
  displayContact.classList.add('hide');
});

contactBtn.addEventListener('click', () => {
  displayContact.classList.remove('hide');
  displayHeading.classList.add('hide');
  displayInputs.classList.add('hide');
  displayList.classList.add('hide');
  displayMainHeader.classList.add('hide');
});

document.addEventListener('DOMContentLoaded', () => {
  const { DateTime } = luxon;
  const section = document.createElement('div');
  section.classList.add('date-time');
  section.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  dateMonth.appendChild(section);
});

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