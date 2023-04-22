function book (title, author, pages, read = false, quote) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.quote = quote
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages long`
  }
};

function haveRead (book) {
  if (book.read === false) {
    return 'This book has not been read.'
  } else {
    return 'This book has been read.'
  }
}

const display = document.getElementById('display')

const theHiddenDimension = new book('The Hidden Dimension', 'Edward T. Hall', 195)

const library = (() => {
  const books = []
  function list () {
    return books
  }
  function info (num) {
    return books[num].info() + '. ' + haveRead(books[num])
  }
  function addBook (book) {
    books.unshift(book)
  }
  function update () {
    display.textContent = library.info(0)
  }
  return {
    books: books,
    addBook: addBook,
    list: list,
    info: info,
    update: update
  };
})();

library.addBook(theHiddenDimension)
console.table(library.list())
display.textContent = library.info(0)

/* Add functions to display array of books and update whenever a book is added */
