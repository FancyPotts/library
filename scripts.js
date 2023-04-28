let library = (() => {
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
      /* This does not update the library to show the correct number of books in array. This also affects the ability to add more books */
      displayBook.innerHTML = ''
      books.forEach(book => display(book))
      library.list()
      console.log(library)
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
  function display (book) {
    /* TODO: Change to Javascript instead of using HTML */
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

/* Use flexbox and add card class to display books on page. */