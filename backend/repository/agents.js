const pool = require('../config/connection');

exports.create = async (agent) => {
  const [result] = await pool.query(
    `INSERT INTO agents (name, email)
     VALUES (?, ?)`,
    [agent.name, agent.email]
  );
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM agents WHERE id = ?`,
    [id]
  );
  return rows[0];
};

exports.findAll = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM agents`,
  );
  return rows;
};


