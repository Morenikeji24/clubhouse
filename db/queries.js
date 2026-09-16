import pool from "./pool.js";

const db = {
  async createUser(first_name, last_name, username, password) {
    await pool.query(
      `INSERT INTO users (first_name, last_name, user_name, password)
            VALUES ($1, $2, $3, $4)`,
      [first_name, last_name, username, password],
    );
  },
};

export default db;
