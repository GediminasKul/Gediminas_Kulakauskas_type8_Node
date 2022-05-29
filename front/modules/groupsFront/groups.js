// eslint-disable-next-line import/extensions
import { fetchAccountGroups, getAllGroups } from '../groupModel';
/* eslint-disable no-param-reassign */
const gridEl = document.querySelector('.grid');
const BASE_URL = 'http://localhost:3000';
const token = localStorage.getItem('userToken');
const selectEl = document.getElementById('group');
const addToGroupForm = document.querySelector('.addToGroup');
const inpEl = document.getElementById('groupName');
const addNewGroupForm = document.querySelector('.addNewGroup');
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

addToGroupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const groupObj = {
    groupId: selectEl.value,
  };
  try {
    const resp = await fetch(`${BASE_URL}/api/accounts`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(groupObj),
    });
    const data = await resp.json();
    if (data.success) {
      fetchAccountGroups(`${BASE_URL}/api/accounts`, gridEl, token);
      getAllGroups(`${BASE_URL}/api/groups`, selectEl, token);
    }
  } catch (error) {
    alert('Something went wrong');
  }
});

addNewGroupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newGroupObj = {
    name: inpEl.value,
  };

  try {
    const resp = await fetch(`${BASE_URL}/api/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newGroupObj),
    });
    const data = await resp.json();
    if (data.success) {
      // eslint-disable-next-line no-alert
      alert('Group created successfully ');
      inpEl.value = '';
      fetchAccountGroups(`${BASE_URL}/api/accounts`, gridEl, token);
      getAllGroups(`${BASE_URL}/api/groups`, selectEl, token);
    }
  } catch (error) {
    alert('something went wrong');
  }
});

fetchAccountGroups(`${BASE_URL}/api/accounts`, gridEl, token);

getAllGroups(`${BASE_URL}/api/groups`, selectEl, token);
