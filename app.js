const formModal = document.querySelector('.form-modal');

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



document.querySelector('.new-book-btn').addEventListener('click', e => {
  formModal.style.display = 'flex'
})

document.querySelector('.close-button').addEventListener('click', formModalModifier())

document.querySelector('.submit-btn').addEventListener('click', e => {
  e.preventDefault()
  formModalModifier()
})