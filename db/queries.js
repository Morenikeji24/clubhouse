import pool from "./pool.js";

const db = {
  async createUser(first_name, last_name, username, password) {
    await pool.query(
      `INSERT INTO users (first_name, last_name, user_name, password)
            VALUES ($1, $2, $3, $4)`,
      [first_name, last_name, username, password],
    );
  },

  async getUser(username) {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE user_name = $1`,
      [username],
    );
    return rows[0];
  },

  async getUserId(id) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    return rows[0];
  },

  async addMessage(title, text, userId) {
    await pool.query(
      `INSERT INTO messages (title, text, user_id)
        VALUES ($1, $2, $3)`,
      [title, text, userId],
    );
  },

  async getAllMessages() {
    const { rows } = await pool.query(`
        SELECT 
        messages.*,
        users.first_name,
        users.last_name
        FROM messages
        JOIN users
        ON messages.user_id = users.id
        ORDER BY messages.time_stamp DESC
        `);

    return rows;
  },

  async addMember(userId) {
    await pool.query(
      `UPDATE users
        SET membership_status = true
        WHERE id = $1`,
      [userId],
    );
  },

  async addAdmin(userId) {
    await pool.query(
      `UPDATE users
        SET admin = true
        WHERE id = $1`,
      [userId],
    );
  },

  async deleteMessage(msgId) {
    await pool.query(
      `DELETE FROM messages
        WHERE id = $1`,
      [msgId],
    );
  },
};

export default db;
