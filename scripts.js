const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const library = (() => {
  const books = []
  const displayBook = document.getElementById('display')
  const addABook = document.getElementById('add')

  function Book (title, author, pages, read = false, quote = 'No quote (yet)', quoteauthor = '') {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.quote = quote
    this.quoteauthor = quoteauthor
    this.info = function () {
      return `<u>${this.title}</u> by <i>${this.author}</i>, ${this.pages} pages long`
    }
  }
  function list () {
    return console.table(books)
  }

  function info (num) {
    return books[num].info() + '. ' + haveRead(books[num])
  }
  function addBook (title, author, pages, read, quote, quoteauthor) {
    const book = new Book(title, author, pages, read, quote, quoteauthor)
    books.push(book)
    const stack = library.books.findIndex(book => book.title === title)
    display(library.books[stack])
  }
  // addABook.addEventListener('click', function() {
  //   console.log('Oh look a new book!')
  // }) Meant to take all the information in modal and add a book
  function display (book) {
    const bookDiv = document.createElement('div')
    const bookInfo = document.createElement('h3')
    const bookDel = document.createElement('button')
    const bookQuote = document.createElement('blockquote')
    const bookQuoteText = document.createElement('h5')
    const bookQuoteAuthor = document.createElement('figcaption')
  
    bookInfo.innerHTML = book.info()
    bookDel.innerHTML = 'Remove'
    bookDel.setAttribute('data-title', book.title)
    bookDel.addEventListener('click', function() {
      const title = this.getAttribute('data-title')
      const bookIndex = books.findIndex(book => book.title === title)
      books.splice(bookIndex, 1)
      this.parentNode.remove()
    })
    bookQuoteText.innerHTML = book.quote
    bookQuoteAuthor.innerHTML = book.quoteauthor
    bookQuote.appendChild(bookQuoteText)
    bookQuote.appendChild(bookQuoteAuthor)
    bookDiv.appendChild(bookInfo)
    bookDiv.appendChild(bookDel)
    bookDiv.appendChild(bookQuote)
    displayBook.appendChild(bookDiv)
  }
  return {
    books: books,
    addBook: addBook,
    list: list,
    info: info,
    display: display
  }
})()

function haveRead (book) {
  if (book.read === false) {
    return 'This book has not been read.'
  } else {
    return 'This book has been read.'
  }
}

library.addBook('The Hidden Dimension', 'Edward T. Hall', 195)
library.addBook('Meditations', 'Marcus Aurelius', 191, true, 'The book is full of quotes.')
library.addBook('Crooked Kingdom', 'Leigh Bardugo', 546, true, 'You\'re not weak because you can\'t read. You\'re weak because you\'re afraid of people seeing your weakness. You\'re letting shame decide who you are.', 'Kaz')

/* Use flexbox and add card class to display books on page. */