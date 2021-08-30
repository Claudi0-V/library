const formModal = document.querySelector('.form-modal');

// Storage
const myLibrary = [{
  title: "1984",
  author: "George Orwell",
  pages: "346",
  readed: true,
},
{
  title: "Animal Farm",
  author: "George Orwell",
  pages: "300",
  readed: true,
},{
  title: "1984",
  author: "George Orwell",
  pages: "346",
  readed: true,
},
];

//Functions Area

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

const addBook = (book, index) => {
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


const findIndex = (e) => {
  myLibrary.forEach((book, index) => {
  let title = e[0].textContent === `Title: ${book.title}`;
  let author = e[1].textContent === `Author: ${book.author}`;
  let bookAutor = `Title: ${book.author}`
  if(title && author) return index
  })
}

const removeFromArray = (e) => {
  let index = findIndex(e);
  myLibrary.splice(index, 1);
}

// Events

libraryUpdate()

document.querySelector('.new-book-btn').addEventListener('click', e => {
  formModal.style.display = 'flex'
})

document.querySelector('.close-button').addEventListener('click', formModalModifier)

document.querySelector('.submit-btn').addEventListener('click', e => {
  e.preventDefault()
  formModalModifier()
})



const removeButton = document.querySelectorAll('.book-close-button');

removeButton.forEach(button => button.addEventListener('click', (e) => {
  e.target.parentElement.remove();
  removeFromArray(e.target.parentElement.childNodes);

}))

const changeButton = document.querySelectorAll('.change-status');

changeButton.forEach(button => button.addEventListener('click', (e) => {
  e.target.parentElement.childNodes
}))