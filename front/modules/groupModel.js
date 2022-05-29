function createCard(id, name) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  cardEl.addEventListener('click', () => {
    window.location.href = `../bills/bills.html?id=${id}`;
  });
  const h3El = document.createElement('h3');
  h3El.textContent = `ID: ${id}`;
  const pEl = document.createElement('p');
  pEl.textContent = name;
  cardEl.append(h3El, pEl);
  return cardEl;
}

function generateCard(dest, arr) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = '';
  // eslint-disable-next-line prefer-const
  let ids = [];
  arr.forEach((accObj) => {
    ids.push(accObj.group_id);
    const card = createCard(accObj.group_id, accObj.name);
    dest.appendChild(card);
  });
  localStorage.setItem('cardsId', ids);
}

function generateOptions(dest, arr) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = '';
  const ids = localStorage.getItem('cardsId');
  if (ids === null) {
    arr.forEach((optionObj) => {
      const option = document.createElement('option');
      option.value = optionObj.id;
      option.textContent = optionObj.name;
      dest.appendChild(option);
    });
    return;
  }
  const filteredIds = arr.filter((optionObj) => !ids.includes(optionObj.id));
  filteredIds.forEach((optionObj) => {
    const option = document.createElement('option');
    option.value = optionObj.id;
    option.textContent = optionObj.name;
    dest.appendChild(option);
  });
}

export async function fetchAccountGroups(endpoint, dest, token) {
  try {
    const resp = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();

    generateCard(dest, data);
  } catch (error) {
    alert('Something went wrong');
  }
}

export async function getAllGroups(endpoint, dest, token) {
  try {
    const resp = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();
    if (data.success) {
      generateOptions(dest, data.data);
    }
  } catch (error) {
    alert('Something went wrong');
  }
}
