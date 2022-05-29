const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// registruoti vartotoja
async function regUser(full_name, email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql =
      'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [full_name, email, password]);
    return result;
  } catch (error) {
    throw error.message;
  } finally {
    await conn?.end();
  }
}

// prijungti vartotoja
async function loginUser(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE email=?';
    const [result] = await conn.execute(sql, [email]);
    return result;
  } catch (error) {
    throw Error(error);
  } finally {
    await conn?.end();
  }
}

module.exports = {
  regUser,
  loginUser,
};
