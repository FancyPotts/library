function addBook (title, author, pages, read = false, quote) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.quote = quote
  this.info = function () {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages long`)
  }
};

const theHiddenDimension = new addBook('The Hidden Dimension', 'Edward T. Hall', '195', false)

theHiddenDimension.info()