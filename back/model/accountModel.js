const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// gauti grupes
async function getGroupsUser(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql =
      'SELECT group_id, user_id, name FROM account LEFT JOIN groups ON account.group_id = groups.id LEFT JOIN users ON account.user_id = users.id WHERE users.id = ?';
    const [result] = await conn.execute(sql, [id]);
    return result;
  } catch (error) {
    throw Error(error);
  } finally {
    await conn?.end();
  }
}

// Ikelti userius i grupes
async function insertUserIntoGroup(groupId, id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO account (group_id, user_id) VALUES (?, ?)';
    const [result] = await conn.execute(sql, [groupId, id]);
    return result;
  } catch (error) {
    throw Error(error);
  } finally {
    await conn?.end();
  }
}

module.exports = {
  getGroupsUser,
  insertUserIntoGroup,
};
