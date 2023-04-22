function book (title, author, pages, read = false, quote) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.quote = quote
  this.info = function () {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages long`)
  }
};

const theHiddenDimension = new book('The Hidden Dimension', 'Edward T. Hall', 195, false)

theHiddenDimension.info()


const library = (() => {
  const books = []
  function list () {
    console.table(books)
  }
  function addBook (book) {
    books.unshift(book)
  }
  return {
    books: books,
    addBook: addBook,
    list: list
  };
})();

console.log(library)

library.addBook(theHiddenDimension)
library.list()
