function setupEventListeners() {
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', toggleTheme);

    const nameInput = document.getElementById('name-input');
    nameInput.addEventListener('input', handleNameInput);

    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', handleCommentSubmit);

    const loadDataButton = document.getElementById('load-data');
    loadDataButton.addEventListener('click', loadData);

    const loadJsonDataButton = document.getElementById('load-json-data');
    loadJsonDataButton.addEventListener('click', loadJsonData);
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
}

function handleNameInput(event) {
    const greetingContainer = document.getElementById('greeting-container');
    const name = event.target.value.trim();
    if (name === '') {
        greetingContainer.textContent = '';
    } else {
        greetingContainer.textContent = `Вітаємо, ${name}!`;
    }
}

function handleCommentSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('comment-name-input');
    const commentInput = document.getElementById('comment-text-input');
    const commentList = document.getElementById('comment-list');

    const name = nameInput.value.trim();
    const commentText = commentInput.value.trim();

    if (name === '' || commentText === '') return;

    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');

    const commentName = document.createElement('div');
    commentName.classList.add('comment-name');
    commentName.textContent = name;

    const commentContent = document.createElement('div');
    commentContent.classList.add('comment-text');
    commentContent.textContent = commentText;

    commentItem.appendChild(commentName);
    commentItem.appendChild(commentContent);
    commentList.appendChild(commentItem);

    nameInput.value = '';
    commentInput.value = '';
}

async function loadData() {
    const dataContainer = document.getElementById('data-container');
    dataContainer.textContent = 'Завантаження...';

    try {
        const response = await fetch('https://web2025-test-data.ikto.net/autumn-note.html');
        if (!response.ok) {
            throw new Error('Помилка мережі');
        }
        const data = await response.text();
        dataContainer.innerHTML = data;
    } catch (error) {
        dataContainer.textContent = 'Не вдалося завантажити дані';
    }
}

async function loadJsonData() {
    const jsonDataContainer = document.getElementById('json-data-container');
    jsonDataContainer.textContent = 'Завантаження...';

    try {
        const response = await fetch('https://web2025-test-data.ikto.net/comments.json');
        if (!response.ok) {
            throw new Error('Помилка мережі');
        }
        const comments = await response.json();

        jsonDataContainer.innerHTML = '';

        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('json-comment-item');

            const commentName = document.createElement('div');
            commentName.classList.add('json-comment-name');
            commentName.textContent = comment.name;

            const commentContent = document.createElement('div');
            commentContent.classList.add('json-comment-text');
            commentContent.textContent = comment.text;

            commentItem.appendChild(commentName);
            commentItem.appendChild(commentContent);
            jsonDataContainer.appendChild(commentItem);
        });
    } catch (error) {
        jsonDataContainer.textContent = 'Не вдалося завантажити дані';
    }
}

document.addEventListener('DOMContentLoaded', setupEventListeners);