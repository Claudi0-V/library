const formModal = document.querySelector('.form-modal');

// Storage
let myLibrary;

if (!localStorage.getItem('myLibrary')) {
  myLibrary = [{title: "1984", author: "Orwell", pages: "320", readed: true}]
} else {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
}

const updateStorage = () => localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

const formModalModifier = () => {
  formModal.style.display = 'none'
  document.querySelector('.book-form').reset()
};

const changeIfBool = (camp) => {
  if ( typeof camp === 'boolean') {
    if (camp) return 'Yes';
    return 'No;' 
}
  return camp;
}

const firstToUpperCase = srt => srt.charAt(0).toUpperCase() + srt.slice(1)

function createBook(title, author, pages, readed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readed = readed;
}

const addBook = (book) => {
  const thisBook = document.querySelector('.book-list');
  const deleteButton = document.createElement('button');
  const xDiv = document.createElement('div');
  const ul = document.createElement('ul');
  xDiv.textContent = '+';
  xDiv.classList.add('book-close-button');
  deleteButton.textContent = 'Change Read Status';
  deleteButton.classList.add('change-status', 'modal-buttons');
  ul.classList.add('single-book')
  ul.appendChild(xDiv);
  for (let camp in book) {
    const li = document.createElement('li');
    let newBookCamp = changeIfBool(book[camp]);
    li.textContent = firstToUpperCase(`${camp}: ${newBookCamp}`);
    ul.appendChild(li);
  }
  ul.appendChild(deleteButton);
  thisBook.appendChild(ul); 
}

const libraryUpdate = () => myLibrary.forEach((book, index) => addBook(book, index));

const findIndex = (childNodes) => {
  let indexFinded
  myLibrary.forEach((book, index) => {
    let title = childNodes[1].textContent === `Title: ${book.title}`;
    let author = childNodes[2].textContent === `Author: ${book.author}`;
    if(title && author) return indexFinded = index;
  })
  return indexFinded;
}

const removeFromArray = (e) => {
  let removeIndex = findIndex(e);
  myLibrary.splice(removeIndex, 1);
}

// Events
libraryUpdate()

document.querySelector('.new-book-btn').addEventListener('click', e => {
  formModal.style.display = 'flex'
})

document.querySelector('.close-button').addEventListener('click', formModalModifier)

document.querySelector('.submit-btn').addEventListener('click', e => {
  e.preventDefault()
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value
  let readed = document.querySelector('#readed').checked;
  if (title === '' || author === '' || pages === '') {
    alert('You need to add the book info!')
  } else {
    const newBook = new createBook(title, author, pages, readed);
    addBook(newBook)
    myLibrary.push(newBook)
    updateStorage()
    formModalModifier()
  }
})

const removeButton = document.querySelectorAll('.book-close-button');
removeButton.forEach(button => button.addEventListener('click', (e) => {
  e.target.parentElement.remove();
  removeFromArray(e.target.parentElement.childNodes);
  updateStorage()
}))

const changeButton = document.querySelectorAll('.change-status');
changeButton.forEach(button => button.addEventListener('click', (e) => {
  let index = findIndex(e.target.parentElement.childNodes);
  let readedValue = e.target.parentElement.childNodes[4].textContent.split(' ')[1];
  let inverseBool = readedValue === 'Yes' ? 'Readed: No' : 'Readed: Yes';
  e.target.parentElement.childNodes[4].textContent = inverseBool
  myLibrary[index].readed = !myLibrary[index].readed;
}))