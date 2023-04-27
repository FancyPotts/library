const display = document.getElementById('display')

const library = (() => {
  const books = []

  function Book (title, author, pages, read = false, quote) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.quote = quote
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages long`
    }
  }
  function list () {
    return books
  }
  function haveRead (book) {
    if (book.read === false) {
      return 'You haven\'t read this book.'
    } else {
      return 'You\'ve read this book.'
    }
  }
  function info (num) {
    return books[num].info() + '. ' + haveRead(books[num])
  }
  function addBook (title, author, pages, read, quote) {
    const book = new Book(title, author, pages, read, quote)
    books.unshift(book)
  }
  return {
    books: books,
    addBook: addBook,
    list: list,
    info: info
  }
})()

function booksCheck() {
  console.table(library.list())
}

library.addBook('The Hidden Dimension', 'Edward T. Hall', 195)

library.addBook('Meditations', 'Marcus Aurelius', 191, true)

console.table(library.list())

library.books.forEach((book) => {
  display.innerHTML += `${book.info()}<br>`
});

/* Use a for loop to load all objects in array on page */

/* Add functions to display array of books and update whenever a book is added */

/* Add an element and add card class to display on page. */
