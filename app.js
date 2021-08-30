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
{
  title: "Animal Farm",
  author: "George Orwell",
  pages: "300",
  readed: false,
},
];

//Functions Area

const formModalModifier = () => {
  formModal.style.display = 'none'
  document.querySelector('.book-form').reset()
};


const addBook = (book, index) => {
  const thisBook = document.querySelector('.book-list');
  const ul = document.createElement('ul');
  ul.classList.add('single-book')
  for (let camp in book) {
    const li = document.createElement('li');
    let newCamp = camp.charAt(0).toUpperCase() + camp.slice(1)
    li.textContent = `${newCamp}: ${book[camp]}`;
    ul.appendChild(li);
  }
  thisBook.appendChild(ul);
}


const libraryUpdate = () => {
  myLibrary.forEach((book, index) => addBook(book, index));
}



// Events

document.querySelector('.new-book-btn').addEventListener('click', e => {
  formModal.style.display = 'flex'
})

document.querySelector('.close-button').addEventListener('click', formModalModifier)

document.querySelector('.submit-btn').addEventListener('click', e => {
  e.preventDefault()
  formModalModifier()
})


libraryUpdate()
//document.addEventListener("DOMContentLoaded", libraryUpdate)