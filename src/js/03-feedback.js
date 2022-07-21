import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('[name="message"]');
const inputEmailEl = document.querySelector('[name="email"]');
const STORAGE_KEY = 'feedback-form-state';
let formInputValues = {};

contantInput();

feedbackFormEl.addEventListener('input', throttle(onTextareaInput, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);

function onTextareaInput(e) {
  formInputValues[e.target.name] = e.target.value;
  //записуємо у Local Storage введенні данні 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formInputValues));
}

//відправка форми. preventDefault() - запобігає перезавантаженню сторінки після відправки. reset() - очищує форму
function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Заповніть усі поля!');
  }
  console.log({ email: email.value, message: message.value });

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

//ф-ція яка повертає заповнені поля форми при перезавантаженні сторінки
function contantInput() {
  const inputValue = localStorage.getItem(STORAGE_KEY);
  if (inputValue) {
    formInputValues = JSON.parse(inputValue);
    inputEmailEl.value = formInputValues.email;
    textareaEl.value = formInputValues.message;
  }
}
