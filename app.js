let books = [];

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = parseInt(document.getElementById('year').value); // Ubah ke tipe data number
  const isComplete = document.getElementById('isComplete').checked;

  const book = {
    id: +new Date(),
    title,
    author,
    year,
    isComplete
  };

  books.push(book);
  updateLocalStorage();
  renderBooks();

  clearForm();
}

function removeBook(bookId) {
  books = books.filter(book => book.id !== bookId);
  updateLocalStorage();
  renderBooks();
}

function moveToComplete(bookId) {
  const index = books.findIndex(book => book.id === bookId);
  books[index].isComplete = true;
  updateLocalStorage();
  renderBooks();
}

function moveToIncomplete(bookId) {
  const index = books.findIndex(book => book.id === bookId);
  books[index].isComplete = false;
  updateLocalStorage();
  renderBooks();
}

function clearForm() {
  document.getElementById('bookForm').reset();
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const bookId = event.dataTransfer.getData('text/plain');
  const index = books.findIndex(book => book.id == bookId);

  if (index !== -1) {
    books[index].isComplete = !books[index].isComplete;
    updateLocalStorage();
    renderBooks();
  }
}

function updateLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function getBooksFromLocalStorage() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
  renderBooks();
}

function renderBooks() {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');
  incompleteBookList.innerHTML = '<h2>Belum Selesai Dibaca</h2>';
  completeBookList.innerHTML = '<h2>Selesai Dibaca</h2>';

  books.forEach(book => {
    const listItem = document.createElement('div');
    listItem.setAttribute('data-id', book.id);
    listItem.setAttribute('draggable', true);
    listItem.ondragstart = (event) => {
      event.dataTransfer.setData('text/plain', book.id);
    };

    const titleElement = document.createElement('p');
    titleElement.textContent = `${book.title} by ${book.author} (${book.year})`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Hapus';
    removeButton.onclick = () => removeBook(book.id);

    listItem.appendChild(titleElement);
    listItem.appendChild(removeButton);

    if (book.isComplete) {
      const incompleteButton = document.createElement('button');
      incompleteButton.textContent = 'Pindahkan ke Belum Selesai';
      incompleteButton.onclick = () => moveToIncomplete(book.id);
      listItem.appendChild(incompleteButton);

      completeBookList.appendChild(listItem);
    } else {
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Pindahkan ke Selesai';
      completeButton.onclick = () => moveToComplete(book.id);
      listItem.appendChild(completeButton);

      incompleteBookList.appendChild(listItem);
    }
  });
}

function searchBooks() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery));
  renderFilteredBooks(filteredBooks);
}

function renderFilteredBooks(filteredBooks) {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  filteredBooks.forEach(book => {
    const listItem = document.createElement('div');
    listItem.setAttribute('data-id', book.id);
    listItem.setAttribute('draggable', true);
    listItem.ondragstart = (event) => {
      event.dataTransfer.setData('text/plain', book.id);
    };

    const titleElement = document.createElement('p');
    titleElement.textContent = `${book.title} by ${book.author} (${book.year})`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Hapus';
    removeButton.onclick = () => removeBook(book.id);

    listItem.appendChild(titleElement);
    listItem.appendChild(removeButton);

    if (book.isComplete) {
      const incompleteButton = document.createElement('button');
      incompleteButton.textContent = 'Pindahkan ke Belum Selesai';
      incompleteButton.onclick = () => moveToIncomplete(book.id);
      listItem.appendChild(incompleteButton);

      completeBookList.appendChild(listItem);
    } else {
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Pindahkan ke Selesai';
      completeButton.onclick = () => moveToComplete(book.id);
      listItem.appendChild(completeButton);

      incompleteBookList.appendChild(listItem);
    }
  });
}

// Load books from localStorage on page load
getBooksFromLocalStorage();
