const inputAuthor = document.querySelector('.input-author');
const inputTitle = document.querySelector('.input-title');
const addBtn = document.querySelector('.add-btn');
const inputData = document.querySelector('.input-data');

const displayBooks = () => {
  inputData.innerHTML = '';
  localStorage.getItem('book');
  const bookItem = JSON.parse(localStorage.getItem('book') || '[]');
  bookItem.forEach(({ title, author, id }) => {
    const div = document.createElement('div');
    div.innerHTML = `<div>title: ${title}</div><br>
                    <div>author: ${author}</div><br>
                    <button class='remove-btn' id='${id}'>Remove</button><br><br>
                    <hr><br>`;
    inputData.appendChild(div);
  });
};

const deleteBook = (el) => {
  const books = JSON.parse(localStorage.getItem('book'));
  localStorage.setItem('book', JSON.stringify(books));
  const { id } = el;
  localStorage.setItem('book', JSON.stringify(books.filter((book) => book.id !== id)));
  displayBooks();
};

addBtn.addEventListener('click', () => {
  if ((inputTitle.value && inputAuthor.value) === '') {
    // eslint-disable-next-line no-alert
    alert('You cannot add empty fields');
  } else {
    const books = JSON.parse(localStorage.getItem('book') || '[]');
    const id = Math.random().toString(36).substr(0, 5);
    books.push({ title: inputTitle.value, author: inputAuthor.value, id });
    localStorage.setItem('book', JSON.stringify(books));
    displayBooks();
    inputAuthor.value = '';
    inputTitle.value = '';
  }
});

inputData.addEventListener('click', (e) => {
  deleteBook(e.target);
});

displayBooks();