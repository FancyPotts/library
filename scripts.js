const modal = document.getElementById('myModal')
const btn = document.getElementById('myBtn')
const span = document.getElementsByClassName('close')[0]

btn.onclick = function () {
  modal.style.display = 'block'
}
span.onclick = function () {
  modal.style.display = 'none'
  document.getElementById('form').reset()
}
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
    document.getElementById('form').reset()
  }
}

const library = (() => {
  const books = []
  const displayBook = document.getElementById('display')

  function Book (title, author, pages, read = false, quote = 'No quote (yet)', quoteauthor = '', quotepage = '') {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.quote = quote
    this.quoteauthor = quoteauthor
    this.quotepage = quotepage
    this.info = function () {
      return `<u>${this.title}</u> by <i>${this.author}</i>`
    }
  }
  function list () {
    return console.table(books)
  }

  function info (num) {
    return books[num].info() + '. ' + haveRead(books[num])
  }
  function addBook (title, author, pages, read, quote, quoteauthor, quotepage) {
    const book = new Book(title, author, pages, read, quote, quoteauthor, quotepage)
    books.push(book)
    const stack = library.books.findIndex(book => book.title === title)
    display(library.books[stack])
  }
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

const bookRead = document.querySelector('#read')
bookRead.addEventListener('click', checkboxClick)

function checkboxClick () {
  const quote = document.getElementById('quote')
  const quoteWho = document.getElementById('quotewho')
  const quoteWhere = document.getElementById('quotewhere')
  const readBookAnswer = document.getElementById('answer')
  if (bookRead.checked === true) {
    quote.disabled = false
    quoteWho.disabled = false
    quoteWhere.disabled = false
    quote.placeholder = 'It was a pleasure to burn.'
    quoteWho.placeholder = 'Guy Montag'
    quoteWhere.placeholder = 1
    readBookAnswer.textContent = '    Yup'
  } else {
    document.getElementById('quote').disabled = true
    document.getElementById('quotewho').disabled = true
    document.getElementById('quotewhere').disabled = true
    quote.placeholder = 'How would you know if you haven\'t read the book?'
    quoteWho.placeholder = ''
    quoteWhere.placeholder = ''
    readBookAnswer.textContent = '    Nope'
  }
}

const bookAdd = document.getElementById('submit')
bookAdd.addEventListener('click', function (e) {
  e.preventDefault()
  const addBookTitle = document.getElementById('title').value
  const addBookAuthor = document.getElementById('author').value
  const addBookPages = document.getElementById('pages').value
  const addBookRead = document.getElementById('read').value === 'true'
  const addBookQuote = document.getElementById('quote').value
  const addBookQuoteWho = document.getElementById('quotewho').value
  const addBookQuoteWhere = document.getElementById('quotewhere').value
  if (addBookTitle.length === 0 || addBookAuthor.length === 0) {
    return
  } else {
    library.addBook(addBookTitle, addBookAuthor,addBookPages, addBookRead, addBookQuote, addBookQuoteWho, addBookQuoteWhere)
    modal.style.display = 'none'
    document.getElementById('form').reset()
  }
})

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

// TODO: Reset form whenever the form is closed
// TODO: Add property to edit book object
// TODO: Add card element
// TODO: Add cards container
// TODO: Make edit and del part of card
// TODO: Add navbar