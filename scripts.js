const library = (() => {
  let books = []
  const addABook = document.getElementById('add')
  const delABook = document.querySelectorAll('.del')
  const displayBook = document.getElementById('display')

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
    this.del = function () {
      books = books.filter((book) => book.title !== this.title)
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
    books.unshift(book)
    display(library.books[0])
  }
  function display (book) {
    displayBook.innerHTML += `<div><h3>${book.info()}</h3><button class='del' disabled>Remove</button></div>
    <blockquote><h5>${book.quote}</h5></blockquote>
    <figcaption>${book.quoteauthor}</figcaption><br>
    ${haveRead(book)}<br>`
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

/* Add .filter function to remove and forEach(library.display) */

/* Add an element and add card class to display on page. */

/* library.books.findIndex(i => i.title === "Crooked Kingdom")
This can be used to search. It'll need to be all lower case and be able to search part of the string while typing in the search bar */