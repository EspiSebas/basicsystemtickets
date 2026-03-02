const pool = require('../config/connection');

exports.create = async (client) => {
  const [result] = await pool.query(
    `INSERT INTO clients (name, email)
     VALUES (?, ?)`,
    [client.name, client.email]
  );
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM clients WHERE id = ?`,
    [id]
  );
  return rows[0];
};

exports.findAll = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM clients`,
  );
  return rows;
};


