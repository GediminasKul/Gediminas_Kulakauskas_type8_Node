// eslint-disable-next-line import/extensions
import { fetchBills, AddNewBill } from '../model/billsModel.js';

const groupId = window.location.search.split('=')[1];
const BASE_URL = 'http://localhost:3000';
const token = localStorage.getItem('userToken');
const tableEl = document.querySelector('.table');
const formEl = document.querySelector('.form');
const signoutEl = document.querySelector('.signout');

if (!token) {
  window.location.replace('../login/index.html');
}

signoutEl.addEventListener('click', () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('cardsId');
  window.location.replace('../login/index.html');
});

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newBillObj = {
    groupId,
    amount: formEl.elements.amount.value,
    description: formEl.elements.description.value,
  };

  // Prideti nauja bill
  const addedResult = await AddNewBill(
    `${BASE_URL}/api/bills`,
    newBillObj,
    token
  );
  if (addedResult.success) {
    tableEl.innerHTML = '';
    fetchBills(`${BASE_URL}/api/bills/${groupId}`, tableEl, token);
    formEl.elements.amount.value = '';
    formEl.elements.description.value = '';
  }
});

fetchBills(`${BASE_URL}/api/bills/${groupId}`, tableEl, token);
