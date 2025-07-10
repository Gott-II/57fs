const form = document.getElementById('book-form');
const list = document.getElementById('book-list');
const clearBtn = document.getElementById('clear-list');
const removeOneBtn = document.getElementById('remove-one');

// 📖 Startdaten
let books = [
    { title: "Harry Potter", author: "Joanne Rowling" },
    { title: "Der Meister und Margarita", author: "Michail Bulgakow" }
];

function renderList() {
    list.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const li = document.createElement('li');
        li.textContent = `"${book.title}" von ${book.author}`;

        // Füge Klasse für Animation nur dem zuletzt hinzugefügten Buch hinzu
        if (i === books.length - 1) {
            li.classList.add('animate');
        }

        list.appendChild(li);
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = form.title.value.trim();
    const author = form.author.value.trim();

    const exists = books.some(book =>
        book.title.toLowerCase() === title.toLowerCase() &&
        book.author.toLowerCase() === author.toLowerCase()
    );

    if (exists) {
        alert("Dieses Buch ist bereits in der Liste!");
        return;
    }

    books.push({ title, author });
    renderList();
    form.reset();
});

clearBtn.addEventListener('click', function () {
    books = [];
    renderList();
});

removeOneBtn.addEventListener('click', function () {
    books.pop();
    renderList();
});

renderList();



