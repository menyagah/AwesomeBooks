const  inputAuthor  = document.querySelector('.input-author');
const  inputTitle = document.querySelector('.input-title');
const  addBtn = document.querySelector('.add-btn');
const inputData = document.querySelector('.input-data');

let data = [];

addBtn.addEventListener('click', ()=>{
    const id = Math.random().toString(36).substr(0,5);
    data.push({title:inputTitle.value, author:inputAuthor.value, id:id});
    displayBooks()
});

const displayBooks = () => {
    const div = document.createElement('div')
    div.innerHTML= `<div>title: ${inputTitle.value}</div><br>
                    <div>author: ${inputAuthor.value}</div><br>`
    inputData.appendChild(div)
    inputAuthor.value = '';
    inputTitle.value = '';
} 