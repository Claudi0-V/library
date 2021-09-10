const formModal = document.querySelector('.form-modal');

class Book {

  constructor(title, author, pages, readed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readed = readed;
  }
}

class Library {

  static openLibrary = () => {
    let myLibrary;
    if (!localStorage.getItem('myLibrary')) {
    myLibrary = [{title: "1984", author: "Orwell", pages: "320", readed: true}]
    } else myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    return myLibrary;
  }

  static updateStorage = (library) => localStorage.setItem('myLibrary', JSON.stringify(library));
  static addBook (book) {
    const myLibrary = Library.openLibrary();
    myLibrary.push(book);
    Library.updateStorage(myLibrary);
  }

  static findIndex = (childNodes) => { 
    let indexFinded;
    const myLibrary = Library.openLibrary();
    myLibrary.forEach((book, index) => {
      let title = childNodes[1].textContent === `Title: ${book.title}`;
      let author = childNodes[2].textContent === `Author: ${book.author}`;
      if(title && author) return indexFinded = index;
    })
    return indexFinded;
  }
  
  static removeFromArray = (e) => {
    let removeIndex = Library.findIndex(e);
    const myLibrary = Library.openLibrary();
    myLibrary.splice(removeIndex, 1);
    Library.updateStorage(myLibrary); 
  }

  static changeReaded = (index) => {
    const myLibrary = Library.openLibrary();
    myLibrary[index].readed = !myLibrary[index].readed
    Library.updateStorage(myLibrary)
  }
}

class Display {

  static changeIfBool = (camp) => {
    if ( typeof camp === 'boolean') {
      if (camp) return 'Yes';
      return 'No' 
  }
    return camp;
  }

  static firstToUpperCase = srt => srt.charAt(0).toUpperCase() + srt.slice(1);

  static formModalModifier = () => {
  formModal.style.display = 'none'
  document.querySelector('.book-form').reset()
  }

  static changeButtonFunc = (e, index) => {
  let readedValue = e.target.parentElement.childNodes[4].textContent.split(' ')[1];
  let inverseBool = readedValue === 'Yes' ? 'Readed: No' : 'Readed: Yes';
  e.target.parentElement.childNodes[4].textContent = inverseBool
}
  static removeButtonFnc = (e) => {
  e.target.parentElement.remove();
  Library.removeFromArray(e.target.parentElement.childNodes);
}
  static addBook = (book) => {
    const thisBook = document.querySelector('.book-list');
    const changeButton = document.createElement('button');
    const xDiv = document.createElement('div');
    const ul = document.createElement('ul');
    xDiv.textContent = '+';
    xDiv.classList.add('book-close-button');
    xDiv.onclick = (e) => {
      Display.removeButtonFnc(e)
      Library.removeFromArray(e);
    }
    changeButton.textContent = 'Change Read Status';
    changeButton.onclick = (e) => {
      let index = Library.findIndex(e.target.parentElement.childNodes);
      Display.changeButtonFunc(e);
      Library.changeReaded(index); 
    };
    changeButton.classList.add('change-status', 'modal-buttons');

    ul.classList.add('single-book')
    ul.appendChild(xDiv);
    for (let camp in book) {
      const li = document.createElement('li');
      let newBookCamp = Display.changeIfBool(book[camp]);
      li.textContent = Display.firstToUpperCase(`${camp}: ${newBookCamp}`);
      ul.appendChild(li);
    }
    ul.appendChild(changeButton);
    thisBook.appendChild(ul); 
  }
}

// Events
document.addEventListener("DOMContentLoaded", () => {
  Library.openLibrary().forEach((book, index) => Display.addBook(book, index))
});



document.querySelector('.new-book-btn').addEventListener('click', e => {
  formModal.style.display = 'flex'
})

document.querySelector('.close-button').addEventListener('click', Display.formModalModifier)

document.querySelector('.submit-btn').addEventListener('click', e => {
  e.preventDefault()
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value
  let readed = document.querySelector('#readed').checked;
  if (title === '' || author === '' || pages === '') {
    alert('You need to add the book info!')
  } else {
    const newBook = new Book(title, author, pages, readed);
    Display.addBook(newBook)
    Library.addBook(newBook)
    Display.formModalModifier()
  }
})

