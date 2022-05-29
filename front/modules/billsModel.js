function generateTh(dest) {
  const tr = document.createElement('tr');
  const thId = document.createElement('th');
  thId.textContent = 'ID';
  const thDescription = document.createElement('th');
  thDescription.textContent = 'Description';
  const thAmount = document.createElement('th');
  thAmount.textContent = 'Amount';
  tr.append(thId, thDescription, thAmount);
  dest.append(tr);
}

function generateTable(arr, dest) {
  generateTh(dest);
  arr.forEach((eObj) => {
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    tdId.textContent = eObj.id;
    const tdAmount = document.createElement('td');
    tdAmount.textContent = `$${eObj.amount}`;
    const tdDescription = document.createElement('td');
    tdDescription.textContent = eObj.description;
    tr.append(tdId, tdDescription, tdAmount);
    dest.appendChild(tr);
  });
}

export async function fetchBills(endpoint, dest, token) {
  const resp = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await resp.json();
  if (data.success) {
    generateTable(data.msg, dest);
  }
}

export async function AddNewBill(endpoint, newObj, token) {
  const resp = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(newObj),
  });
  const data = await resp.json();
  return data;
}
