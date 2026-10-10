
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

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

// Clear custom error messages when the user edits a field
[titleInput, authorInput, pagesInput].forEach((field) => {
    field.addEventListener("input", () => {
        field.setCustomValidity("");
    });
});

// Form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get and clean form values
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pagesInput.value;
    const read = readInput.checked;

    // Clear any previous custom errors
    [titleInput, authorInput, pagesInput].forEach((field) => {
        field.setCustomValidity("");
    });

    // Validate title
    if (title === "") {
        titleInput.setCustomValidity(
            "The book title must be filled!"
        );
        titleInput.reportValidity();
        return;
    }

    // Validate author
    if (author === "") {
        authorInput.setCustomValidity(
            "The author name must be filled!"
        );
        authorInput.reportValidity();
        return;
    }

    // Validate pages
    if (pages === "" || Number(pages) < 1) {
        pagesInput.setCustomValidity(
            "The number of pages must be at least 1!"
        );
        pagesInput.reportValidity();
        return;
    }

    // Add new book to array
    addBookToLibrary(title, author, Number(pages), read);

    // Refresh display
    displayBooks();

    // Clear form
    form.reset();

    // Hide form
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

// Show the form
const newBookButton = document.querySelector("#new-book");

newBookButton.addEventListener("click", function () {
    form.style.display = "block";
});

// Temporary books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);

// Initial display
displayBooks();
