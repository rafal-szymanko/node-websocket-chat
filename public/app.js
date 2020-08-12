const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));


const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

messagesSection.classList.remove('show');

const addMessage = (author, content) => {

  const message = `<li class="${author == userName ? "message message--received message--self": "message message--received"}">
  <h3 class="message__author">${author == userName ? "You" : author}</h3>
  <div class="message__content">
    ${content}
  </div>
  </li>`;

  messagesList.insertAdjacentHTML('beforeend', message);
}


const login = (event) => {
  event.preventDefault();

  if (userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('join', { userName: userName});
  } else {
    alert('Make sure you write your name.')
  }
};

const sendMessage = (event) => {
  event.preventDefault();

  if (messageContentInput.value) {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContentInput.value });
    messageContentInput.value = '';
  } else {
    alert('Make sure you write your message.');
  }
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);