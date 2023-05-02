const modal = document.getElementById('myModal')
const btn = document.getElementById('myBtn')
const span = document.getElementsByClassName('close')[0]
const editLegend = document.getElementById('modalLegend')
const bookSubmit = document.getElementById('submit')
const mainBookTitle = document.getElementById('title')
const mainBookAuthor = document.getElementById('author')
const mainBookPages = document.getElementById('pages')
const mainBookRead = document.getElementById('read')
const mainBookQuote = document.getElementById('quote')
const mainBookQuoteWho = document.getElementById('quotewho')
const mainBookQuoteWhere = document.getElementById('quotewhere')

btn.onclick = function () {
  editLegend.innerHTML = 'Add a book'
  bookSubmit.innerHTML = 'Add book to library'
  modal.style.display = 'block'
}
span.onclick = function () {
  modal.style.display = 'none'
  formReset(true)
}
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
    formReset(true)
  }
}

const library = (() => {
  const books = []
  const displayBook = document.getElementById('display')
  let bookIndex = 0

  function Book (title, author, pages, read = false, quote = 'No quote (yet)', quoteauthor = '', quotepage = '') {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.quote = quote
    this.quoteauthor = quoteauthor
    this.quotepage = quotepage
    this.info = function () {
      return `<strong>${this.title}</strong><H5><i>${this.author}</i></h5></span>`
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
    const bookEdit = document.createElement('button')
    const bookQuote = document.createElement('blockquote')
    const bookQuoteText = document.createElement('h5')
    const bookQuoteAuthor = document.createElement('figcaption')
    bookDiv.className = 'card'
    bookDel.classList.add('del', 'material-icons')
    bookEdit.classList.add('edit', 'material-icons')
    bookInfo.innerHTML = book.info()
    bookEdit.innerHTML = 'settings'
    bookEdit.setAttribute('data-title', book.title)
    bookEdit.onclick = function () {
      const title = this.getAttribute('data-title')
      bookIndex = books.findIndex(book => book.title === title)
      mainBookTitle.value = books[bookIndex].title
      mainBookAuthor.value = books[bookIndex].author
      mainBookPages.value = books[bookIndex].pages
      mainBookRead.checked = books[bookIndex].read
      mainBookQuote.value = books[bookIndex].quote
      mainBookQuoteWho.value = books[bookIndex].quoteauthor
      mainBookQuoteWhere.value = books[bookIndex].quotepage
      checkboxClick()
      // checkboxClick() This causes any book entry to come up empty when editing, due to the boolean returns
      editLegend.innerHTML = 'Edit details'
      bookSubmit.innerHTML = 'Update book details'
      modal.style.display = 'block'
      return bookIndex
    }
    bookSubmit.addEventListener('click', function (e) {
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
      } else if (bookSubmit.innerHTML === 'Add book to library') {
        library.addBook(addBookTitle, addBookAuthor, addBookPages, addBookRead, addBookQuote, addBookQuoteWho, addBookQuoteWhere)
        modal.style.display = 'none'
        document.getElementById('form').reset()
        console.log('Reset!')
        formReset(true)
      } else if (bookSubmit.innerHTML === 'Update book details') {
        books[bookIndex].title = mainBookTitle.value
        books[bookIndex].author = mainBookAuthor.value
        books[bookIndex].pages = mainBookPages.value
        books[bookIndex].read = mainBookRead.checked
        books[bookIndex].quote = mainBookQuote.value
        books[bookIndex].quoteauthor = mainBookQuoteWho.value
        books[bookIndex].quotepage = mainBookQuoteWhere.value
        // nth-child search does not index from 0, hence + 1
        const updateCard = document.querySelector('.card:nth-child(' + bookIndex + 1 + ')')
        const updateCardTitle = updateCard.querySelector('h3')
        const updateButtons = updateCard.querySelectorAll('button')
        // const updateCardQuoteText = updateCard.getElementsByTagName('h5')[0]
        // const updateCardQuoteAuthor = updateCard.getElementsByTagName('figcaption')[0]
        updateButtons.forEach((button) => {
          button.setAttribute('data-title', mainBookTitle.value)
        })
        updateCardTitle.innerHTML = books[bookIndex].info()
        // updateCardQuoteText.innerHTML = books[bookIndex].quote
        // updateCardQuoteAuthor.innerHTML = books[bookIndex].quoteauthor
        modal.style.display = 'none'
        document.getElementById('form').reset()
        formReset(true)
      }
    })
    bookDel.innerHTML = 'delete_forever'
    bookDel.setAttribute('data-title', book.title)
    bookDel.addEventListener('click', function () {
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
    bookDiv.appendChild(bookEdit)
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

function formReset (newForm = false) {
  const quote = document.getElementById('quote')
  const quoteWho = document.getElementById('quotewho')
  const quoteWhere = document.getElementById('quotewhere')
  const readBookAnswer = document.getElementById('answer')

  document.getElementById('quote').disabled = true
  document.getElementById('quotewho').disabled = true
  document.getElementById('quotewhere').disabled = true
  quote.placeholder = 'How would you know if you haven\'t read the book?'
  quoteWho.placeholder = ''
  quoteWhere.placeholder = ''
  readBookAnswer.textContent = '    Nope'
  if (newForm === true) {
    document.getElementById('form').reset()
  } else {
    return
  }
}

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
    formReset(false)
  }
}

function haveRead (book) {
  if (book.read === false) {
    return 'This book has not been read.'
  } else {
    return 'This book has been read.'
  }
}

library.addBook('Fahrenheit 451', 'Ray Bradbury', 158, true, 'It was a pleasure to burn', 'Guy Montag', 1)
library.addBook('The Hidden Dimension', 'Edward T. Hall', 195)
library.addBook('Meditations', 'Marcus Aurelius', 191, true, 'You could leave life right now. Let that determine what you do, say and think.', 'Marcus Aurelius')
library.addBook('Crooked Kingdom', 'Leigh Bardugo', 546, true, 'You\'re not weak because you can\'t read. You\'re weak because you\'re afraid of people seeing your weakness. You\'re letting shame decide who you are.', 'Kaz')

// TODO: Add navbar
