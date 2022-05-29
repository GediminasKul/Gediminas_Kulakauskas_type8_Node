// eslint-disable-next-line import/extensions
import { clearErrorsArr, errorsArr, checkInput } from '../validation.js';

const BASE_URL = 'http://localhost:3000';

const formEl = document.forms[0];
const errSpanEl = document.querySelectorAll('.errorSpan');
const emailInpEL = formEl.elements.email;
const passwordInpEL = formEl.elements.password;

function clearErrors() {
  clearErrorsArr();
  errSpanEl.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}

function handleError(msg) {
  errSpanEl.textContent = '';
  if (typeof msg === 'string') {
    errSpanEl.forEach((elements) => {
      // eslint-disable-next-line no-param-reassign
      elements.textContent = msg;
      elements.previousElementSibling.classList.add('invalid-input');
    });
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

emailInpEL.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'email']);
  handleError(errorsArr);
});

passwordInpEL.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'maxLength-12']);
  handleError(errorsArr);
});

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const logInInfo = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  clearErrors();
  checkInput(logInInfo.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(logInInfo.password, 'password', [
    'required',
    'minLength-4',
    'maxLength-12',
  ]);
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  try {
    const resp = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logInInfo),
    });
    const data = await resp.json();

    if (data.success) {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.paylod.userId);
      window.location.replace('../groups/groups.html');
    }
    throw data.message;
  } catch (error) {
    handleError(error);
  }
});
