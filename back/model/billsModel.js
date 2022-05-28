const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// gauti bills
async function getBills(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql = 'SELECT * FROM bills WHERE group_id = ?';
    const [result] = await conn.execute(sql, [id]);
    return result;
  } catch (error) {
    throw error.message;
  } finally {
    await conn?.end();
  }
}

// papostinti bills
async function postBills(groupId, amount, description) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql =
      'INSERT INTO bills( group_id, amount, description) VALUES(?,?,?)';
    const [result] = await conn.execute(sql, [groupId, amount, description]);
    return result;
  } catch (error) {
    throw error.message;
  } finally {
    await conn?.end();
  }
}
module.exports = {
  getBills,
  postBills,
};
