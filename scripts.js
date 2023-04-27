const display = document.getElementById('display')

const library = (() => {
  const books = []
  const addABook = document.getElementsByTagName('button')

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
    return books
  }

  function info (num) {
    return books[num].info() + '. ' + haveRead(books[num])
  }
  function addBook (title, author, pages, read, quote, quoteauthor) {
    const book = new Book(title, author, pages, read, quote, quoteauthor)
    books.unshift(book)
  }
  return {
    books: books,
    addBook: addBook,
    list: list,
    info: info
  }
})()

function haveRead (book) {
  if (book.read === false) {
    return 'This book has not been read.'
  } else {
    return 'This book has been read.'
  }
}

function booksCheck() {
  console.table(library.list())
}

library.addBook('The Hidden Dimension', 'Edward T. Hall', 195)
library.addBook('Meditations', 'Marcus Aurelius', 191, true, 'The book is full of quotes.')
library.addBook('Crooked Kingdom', 'Leigh Bardugo', 546, true, 'You\'re not weak because you can\'t read. You\'re weak because you\'re afraid of people seeing your weakness. You\'re letting shame decide who you are.', 'Kaz')

console.table(library.list())

library.books.forEach((book) => {
  display.innerHTML += `<h3>${book.info()}</h3><blockquote><h5>${book.quote}</h5></blockquote><figcaption>${book.quoteauthor}</figcaption><br>${haveRead(book)}`
});

/* Add functions to display array of books and update whenever a book is added */

/* Add an element and add card class to display on page. */

/* library.books.findIndex(i => i.title === "Crooked Kingdom")
This can be used to search. It'll need to be all lower case and be able to search part of the string while typing in the search bar */