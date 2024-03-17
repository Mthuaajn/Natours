// eslint-disable
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login } from './login';
import { logout } from './logout';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const UpdateUserDateForm = document.querySelector('.form-user-data');
const UpdateUserPasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (UpdateUserDateForm) {
  UpdateUserDateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);
    updateSettings(form, 'data');
  });
}

if (UpdateUserPasswordForm) {
  UpdateUserPasswordForm.addEventListener('submit', async (e) => {
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    // input có thuộc tính là data-tour-id sau khi sử lí api thì thành là tourId
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
