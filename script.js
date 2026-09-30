const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// Toggle read status
Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

const library = document.querySelector("#library");
const form = document.querySelector("#book-form");

// Form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    // Add new book to array
    addBookToLibrary(title, author, pages, read);

    // Refresh display
    displayBooks();

    // Clear form
    form.reset();

    form.style.display = "none";
});

function displayBooks() {
    // Clear existing cards
    library.innerHTML = "";

    // Loop through every book
    myLibrary.forEach(book => {

        // Create card
        const card = document.createElement("div");

        // Connect card to book using ID
        card.dataset.id = book.id;

        // Book title
        const title = document.createElement("p");
        title.textContent = `Title: ${book.title}`;

        // Book author
        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        // Book pages
        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        // Read status
        const status = document.createElement("p");
        status.textContent = book.read ? "Read" : "Not read";

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {

            const index = myLibrary.findIndex(
                book => book.id === card.dataset.id
            );

            myLibrary.splice(index, 1);

            displayBooks();
        });

        // Toggle read button
        const readButton = document.createElement("button");
        readButton.textContent = "Toggle Read";

        readButton.addEventListener("click", function () {

            book.toggleRead();

            displayBooks();
        });

        // Put everything inside the card
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);
        card.appendChild(removeButton);
        card.appendChild(readButton);

        // Put card on the webpage
        library.appendChild(card);
    });
}

const newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click",function()
{
    form.style.display = "block";
});




// Temporary books for testing
addBookToLibrary(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    false
);

addBookToLibrary(
    "1984",
    "George Orwell",
    328,
    true
);

// Initial display
displayBooks();

