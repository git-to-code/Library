let container = document.querySelector(".books-container");

const myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    "number-of-pages": 295,
    "reading-status": "not read",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    "number-of-pages": 295,
    "reading-status": "not read",
  },
  {
    title: "Harry Potter and the chamber of secrets",
    author: "J.K. Rowling",
    "number-of-pages": 295,
    "reading-status": "not read",
  },
  {
    title: "Harry Potter and the prisoner of azkaban",
    author: "J.K. Rowling",
    "number-of-pages": 295,
    "reading-status": "not read",
  },
  {
    title: "Harry Potter and the Goblet of fire",
    author: "J.K. Rowling",
    "number-of-pages": 295,
    "reading-status": "not read",
  },
];

displayBooks(myLibrary);

function Book(title, author, pages, readingStatus) {
  this.title = title;
  this.author = author;
  this["number-of-pages"] = pages;
  this["reading-status"] = readingStatus;
}

Book.prototype.changeReadStatus = function (p) {
  let readS = this["reading-status"];
  readS == "not read" ? (readS = "read") : (readS = "not read");
  this["reading-status"] = readS;
  p.textContent = "Read Status: " + readS;
};

function addBookToLibrary(title, author, pages, readingStatus) {
  const book = new Book(title, author, pages, readingStatus);
  myLibrary.push(book);
  // const bookIndex = myLibrary.findIndex((x) => x.title === title);
  // displayBookCard(book, bookIndex);
  displayBooks(myLibrary);
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const addButton = document.querySelector("dialog #add");
const closeButton = document.querySelector("dialog #close");
const readButton = document.querySelector("dialog #close");

const form = document.querySelector("form");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  form.reset();
  dialog.close();
});

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#number-of-pages").value;
  const readingStatus = document.querySelector(
    "input[name='reading-status']:checked"
  ).value;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, readingStatus);
    form.reset();
    dialog.close();
  }
});

function displayBooks(myLibrary) {
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    Object.setPrototypeOf(myLibrary[i], Book.prototype);
    displayBookCard(myLibrary[i], i);
  }
}

function displayBookCard(book, index) {
  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-index", index);

  let title = document.createElement("h2");
  title.textContent = `Title: ${book.title}`;

  let author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;

  let pages = document.createElement("p");
  pages.textContent = `Number of Pages: ${book["number-of-pages"]}`;

  let status = document.createElement("p");
  status.textContent = `Read Status: ${book["reading-status"]}`;

  let remove = document.createElement("button");
  remove.textContent = "Remove Book";
  remove.className = "remove-book";
  remove.addEventListener("click", () => {
    let book = remove.parentElement;
    // let bookIndex = book.getAttribute("data-index");
    book.remove();
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  });

  let changeReadingStatus = document.createElement("button");
  changeReadingStatus.textContent = "Change Reading Status";
  changeReadingStatus.className = "reading-status";
  changeReadingStatus.addEventListener("click", () => {
    let book = changeReadingStatus.parentElement;
    // let bookIndex = book.getAttribute("data-index");
    let status = book.querySelectorAll("p");
    let last = status[status.length - 1];
    console.log(myLibrary[index]);
    myLibrary[index].changeReadStatus(last);
  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(status);
  card.appendChild(remove);
  card.appendChild(changeReadingStatus);
  container.appendChild(card);

  return card;
}
